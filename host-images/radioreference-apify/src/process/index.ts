import Apify from 'apify';

async function run() {
  const dataset = await Apify.openDataset('radioref-usa', {
    forceCloud: process.env.APIFY_CLOUD,
  });

  const data = await dataset.getData({ format: 'json' });

  debugger;
}

run();
