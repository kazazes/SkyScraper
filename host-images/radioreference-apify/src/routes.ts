import cheerioTableparser from 'cheerio-tableparser';
import * as Apify from 'apify';
import { Page } from 'puppeteer';
import parseSystem from './parseSystem';
import { Request } from 'apify';
import * as cheerio from 'cheerio';
import { zipObject, camelCase } from 'lodash';
import moment = require('moment');
const geocode = require('reverse-geocode');

const {
  utils: { log },
} = Apify;

const dateStr = moment()
  .utc()
  .format('MM-DD-YYYY');

exports.MAP = async (
  {
    page,
    request,
  }: {
    page: Page;
    request: Apify.Request;
  },
  { requestQueue }: { requestQueue: Apify.RequestQueue }
) => {
  await Apify.utils.puppeteer.injectJQuery(page);
  await page.waitForSelector('select[name=stid]');

  const states = await page.$eval('select[name=stid]', (select: Element) => {
    if (typeof select === 'undefined') return [];
    return $(select)
      .find('option')
      .toArray()
      .map((v: any) => [v.value, v.innerText]);
  });

  log.info(`Scraped ${states.length} states`);

  states.forEach((stateTupple: any) => {
    requestQueue.addRequest({
      url: `https://www.radioreference.com/apps/db/?stid=${stateTupple[0]}&tab=trs`,
      userData: {
        label: 'STATE',
      },
    });
  });
};

exports.STATE = async (
  {
    page,
    request,
  }: {
    page: Page;
    request: Apify.Request;
  },
  { requestQueue }: { requestQueue: Apify.RequestList }
) => {
  const id = request.url.split('?')[1].replace('id=', '-');

  const state = await page.evaluate(() => {
    return $('table h1')
      .text()
      .trim();
  });

  log.info(`Scraping ${state}`);

  const systems = await page.evaluate(() => {
    return $('#tabcontents > table > tbody tr')
      .map((i, v) => {
        const d = $(v).find('a');
        return {
          name: $(d)
            .text()
            .trim(),
          url: $(d).attr('href'),
        };
      })
      .toArray();
  });

  systems.forEach((system: any) => {
    if (!system.url && !system.name) return;
    requestQueue.addRequest({
      url: `https://www.radioreference.com${system.url}&opt=all_tg`,
      userData: {
        label: 'SYSTEM',
      },
    });

    return systems;
  });

  const results = {
    systems,
    url: request.url,
    uniqueIdentifier: id,
    owner: request.userData.owner,
  };

  log.debug(`Scraping ${results.url}`);
  log.debug('Pushing data to dataset.');
  const stateDataset = await Apify.openDataset(`radioref-states-${dateStr}`, {
    forceCloud: process.env.APIFY_CLOUD === '1',
  });
  await stateDataset.pushData(results);
};

exports.SYSTEM = async (
  {
    page,
    request,
  }: {
    page: Page;
    request: Apify.Request;
  },
  { requestQueue }: { requestQueue: Apify.RequestList }
) => {
  const id = request.url.split('?')[1].replace('id=', '-');

  const content = await page.content();
  const $ = cheerio.load(content);
  $('table.rrtable a')
    .toArray()
    .filter(el => {
      const url = $(el).attr('href');
      if (url && url.includes('siteId')) {
        requestQueue.addRequest(
          {
            url: `https://www.radioreference.com${url}`,
            userData: {
              label: 'SITE_DETAILS',
            },
          },
          { forefront: true }
        );
      }
    });

  await Apify.utils.puppeteer.enqueueLinks({
    page,
    selector: 'table a',
    pseudoUrls: ['https://www.radioreference.com/apps/db/?siteId=[d+]'],
    requestQueue,
    transformRequestFunction: (ctx: any) => {
      ctx.userData.label = 'SITE_DETAILS';
    },
  });

  log.debug('Scraping results.');
  let results = (await parseSystem(page)) as any;

  results = {
    ...results,
    url: request.url,
    uniqueIdentifier: id,
    owner: request.userData.owner,
  };

  const systemDataset = await Apify.openDataset(`radioref-systems-${dateStr}`, {
    forceCloud: process.env.APIFY_CLOUD === '1',
  });
  log.debug('Pushing system data to dataset.');
  await systemDataset.pushData(results);
};

exports.SITE_DETAILS = async (
  {
    page,
    request,
  }: {
    page: Page;
    request: Apify.Request;
  },
  { requestQueue }: { requestQueue: Apify.RequestList }
) => {
  const content = await page.content();
  const $ = cheerio.load(content);
  cheerioTableparser($);
  const systemInfoTable = ($(
    'td.main table.layout table.rrtable:nth-child(1)'
  ).first() as any).parsetable(false, false, true);
  systemInfoTable[0] = systemInfoTable[0].map((k: string) => {
    return camelCase(k.replace(':', '').trim());
  });
  const systemInfo = zipObject(systemInfoTable[0], systemInfoTable[1]) as {
    [key: string]: any;
  };

  if (systemInfo.latitude && systemInfo.longitude) {
    const latNumber = Number(systemInfo.latitude.replace(/[^-\d\.]/g, ''));
    const longNumber = Number(systemInfo.longitude.replace(/[^-\d\.]/g, ''));
    const g = geocode.lookup(latNumber, longNumber, 'us');

    systemInfo.location = g;
  }

  if (systemInfo.range) {
    systemInfo.range = {
      distance: Number(systemInfo.range.replace(/[^\d\.]+/g, '')),
      units: systemInfo.range.replace(/[\d\.\s]+/g, '').toLowerCase(),
    };
  }

  const siteDataset = await Apify.openDataset(`radioref-sites-${dateStr}`, {
    forceCloud: process.env.APIFY_CLOUD === '1',
  });
  await siteDataset.pushData(systemInfo);
};
