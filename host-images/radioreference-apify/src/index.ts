import * as Apify from 'apify';
import { createRouter, getSources } from './tools';

const {
  utils: { log },
} = Apify;

Apify.main(async () => {
  log.info('Starting actor.');
  const sources = getSources();
  const requestQueue = await Apify.openRequestQueue();
  sources.forEach(s => requestQueue.addRequest(s));
  const router = await createRouter({ requestQueue });

  log.debug('Setting up crawler.');
  const crawler = new Apify.PuppeteerCrawler({
    requestQueue,
    handlePageFunction: async ({ request, page }) => {
      log.info(`Processing ${request.url}`);
      await router(request.userData.label, { request, page });
    },
    maxConcurrency: 2,
    maxRequestsPerCrawl: 10000,
  });

  log.info('Starting the crawl.');
  await crawler.run();
  log.info('Actor finished.');
});
