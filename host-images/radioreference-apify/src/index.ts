import * as Apify from 'apify';
import * as dotenv from 'dotenv';
import { Page, Request } from 'puppeteer';
import { createRouter, getSources } from './tools';
import { readFileSync } from 'fs';

const envConfig = dotenv.parse(readFileSync('.env'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const {
  utils: { log },
} = Apify;

Apify.main(async () => {
  log.info('Starting actor.');
  const sources = getSources();
  const requestQueue = await Apify.openRequestQueue('radioref', {
    forceCloud: process.env.APIFY_CLOUD === '1',
  });

  await Apify.openDataset('radioref', {
    forceCloud: process.env.APIFY_CLOUD === '1',
  });

  sources.forEach(s => requestQueue.addRequest(s));
  const router = await createRouter({ requestQueue });

  log.debug('Setting up crawler.');
  const crawler = new Apify.PuppeteerCrawler({
    requestQueue,
    handlePageFunction: async ({ request, page }) => {
      log.info(`Processing ${request.url}`);
      await blockRequests(page);
      await router(request.userData.label, { request, page });
    },
    launchPuppeteerOptions: {
      // useApifyProxy: true,
    },
    autoscaledPoolOptions: {
      desiredConcurrency: 8,
    },
  });

  log.info('Starting the crawl.');
  await crawler.run();
  log.info('Actor finished.');
});

async function blockRequests(page: Page) {
  await Apify.utils.puppeteer.addInterceptRequestHandler(
    page,
    (request: Request) => {
      if (request.resourceType() === 'script') return request.abort();
      return request.continue();
    }
  );
  await Apify.utils.puppeteer.blockRequests(page, {
    urlPaterns: [
      'google',
      '.gif',
      'ads',
      'moat',
      'facebook',
      'simpli',
      'verify',
    ],
    includeDefaults: true,
  });
}
