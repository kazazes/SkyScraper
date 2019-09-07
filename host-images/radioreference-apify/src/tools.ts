// tools.js
import * as Apify from 'apify';
const routes = require('./routes');
const {
  utils: { log },
} = Apify;

export function getSources() {
  log.debug('Getting sources.');
  return [
    {
      url: `https://www.radioreference.com/apps/db/`,
      userData: {
        label: 'MAP',
      },
    },
  ];
}

export async function createRouter(globalContext: any) {
  return async function(routeName: string, requestContext: any) {
    const route = routes[routeName];
    if (!route) throw new Error(`No route for name: ${routeName}`);
    log.debug(`Invoking route: ${routeName}`);
    return route(requestContext, globalContext);
  };
}
