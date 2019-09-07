import { TrunkedSite, Convert } from './parsers/siteParser';
import { groupBy } from 'lodash';
export default class TrunkedSites {
  serialized: TrunkedSite[];
  constructor(data: string | object | Buffer) {
    if (typeof data === 'string') {
      this.serialized = Convert.toTrunkedSites(data);
    } else if (Buffer.isBuffer(data)) {
      this.serialized = Convert.toTrunkedSites(data.toString());
    } else {
      this.serialized = Convert.toTrunkedSites(JSON.stringify(data));
    }
    console.log(`Serialized ${this.serialized.length} trunked sites`);
  }

  siteWithId(siteId: number) {
    return this.serialized.find(site => {
      return site.siteUniqueDBID === siteId.toFixed(0);
    });
  }
}
