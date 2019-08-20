import * as Apify from 'apify';
import { Page, ElementHandle } from 'puppeteer';
import { url } from 'inspector';
import parseSystem from './parseSystem';

const {
  utils: { log },
} = Apify;

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

  log.info(JSON.stringify(states, null, 2));

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
  await Apify.pushData(results);
};

exports.SYSTEM = async (
  {
    page,
    request,
  }: {
    page: any;
    request: Apify.Request;
  },
  { requestQueue }: { requestQueue: Apify.RequestList }
) => {
  const id = request.url.split('?')[1].replace('id=', '-');
  await Apify.utils.puppeteer.injectJQuery(page);

  log.debug('Scraping results.');
  let results = (await parseSystem(page)) as any;

  results = {
    ...results,
    url: request.url,
    uniqueIdentifier: id,
    owner: request.userData.owner,
  };

  log.debug('Pushing data to dataset.');
  await Apify.pushData(results);
};
