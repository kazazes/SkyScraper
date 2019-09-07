import CHEERIO from 'cheerio';
declare module 'cheerio' {
  export interface Cheerio {
    parsetable(
      carryRight: boolean,
      carryDown: boolean,
      cleanText: boolean
    ): any;
  }
}
