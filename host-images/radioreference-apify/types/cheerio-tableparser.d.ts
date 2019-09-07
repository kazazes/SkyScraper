declare module 'cheerio-tableparser' {
  import * as cheerioTables from 'cheerio-tableparser';
  import * as cheerio from 'cheerio';
  export default function cheerioTableparser($: CheerioStatic);
}

declare module 'cheerio' {
  export interface Cheerio {
    parsetable(...args: any);
  }
}
