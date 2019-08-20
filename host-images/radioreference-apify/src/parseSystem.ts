import { Page } from 'puppeteer';
import cheerio from 'cheerio';
import { zipObject, Dictionary } from 'lodash';
import { utils } from 'apify';
import cheerioTableparser from 'cheerio-tableparser';
import { groupBy, camelCase } from 'lodash';

const { log } = utils;

export default async function parseSystem(page: Page) {
  const content = await page.content();

  const $ = cheerio.load(content);

  const systemInfo = parseInfoTable($, page);
  log.info(`Parsing ${systemInfo.state} - ${systemInfo.systemName}`);
  const sites = parseSystemFrequencies($);
  const talkgroups = parseTalkgroups($);

  return { ...systemInfo, sites, talkgroups };
}

function parseTalkgroups($: CheerioStatic) {
  cheerioTableparser($);
  const tgTable = getTableByTitle('System Talkgroups', $);
  if (tgTable.length === 0) {
    return log.warning(
      `No talkgroups for ${$('#tabcontents > h1')
        .text()
        .trim()}`
    );
  }
  const tgArray = (tgTable as any).parsetable(false, false, true) as string[][];
  const talkgroups: TrunkedTalkgroup[] = (new Array(tgArray[0].length - 1)
    .fill(null)
    .map(() => ({})) as unknown) as TrunkedTalkgroup[];

  tgArray.forEach((row, idx) => {
    const $ = cheerio.load(row.shift() as string);
    const firstElem = $('body')
      .text()
      .trim();

    switch (firstElem) {
      case 'DEC':
        row.forEach((d, i) => (talkgroups[i].decimal = d));
        break;
      case 'Mode':
        row.forEach((m, i) => {
          switch (m) {
            case 'A':
            case 'a':
              talkgroups[i].mode = 'ANALOG';
              break;
            case 'D':
            case 'd':
              talkgroups[i].mode = 'DIGITAL';
              break;
            case 'De':
            case 'DE':
            case 'TE':
            case 'Te':
            case 'E':
            case 'Ae':
            case 'AE':
              talkgroups[i].mode = 'ENCRYPTED';
              break;
            case 'T':
              talkgroups[i].mode = 'TDMA';
              break;
            default:
              log.error(`Could not classify TG mode ${m}`);
              break;
          }
        });
        break;
      case 'Alpha Tag':
        break;
      case 'Description':
        row.forEach((d, i) => (talkgroups[i].description = d));
        break;
      case 'Tag':
        row.forEach((t, i) => (talkgroups[i].tag = t));
        break;
      case 'Group':
        row.forEach((g, i) => (talkgroups[i].group = g));
        break;
      default:
        log.error(`No handler for table heading ${firstElem}`);
        break;
    }
  });

  const groupedTalkgroups: TrunkedTalkgroups = groupBy(talkgroups, 'group');

  return groupedTalkgroups;
}

function parseSystemFrequencies($: CheerioStatic) {
  cheerioTableparser($);

  const frequencyTable = getTableByTitle('System Frequencies', $);
  const frequencyArray = (frequencyTable as any).parsetable(true, true, false);
  const freqs = (new Array(frequencyArray[0].length - 1).fill(null).map(() => ({
    frequencies: [],
    siteCounty: {},
  })) as unknown) as TrunkedSite[];
  const wrappedRows: number[] = [];
  frequencyArray.forEach((row: string[], idx: number) => {
    const $ = cheerio.load(row.shift() as string);
    const firstElem = $('body')
      .text()
      .trim();
    switch (firstElem) {
      case 'Site':
        row.forEach((s, i) => {
          if (s === '&#xA0;') {
            wrappedRows.push(i);
            return;
          }
          freqs[i].site = s;
        });
        break;
      case 'Name':
        row.forEach((site, i) => {
          if (wrappedRows.includes(i)) return;
          const $ = cheerio.load(site);
          const siteLink = $('a').attr('href');
          const siteName = $('a').text();
          freqs[i].siteLink = siteLink;
          freqs[i].siteName = siteName;
          freqs[i].siteId = Number(siteLink.replace(/[^\d+]/g, ''));
        });
        break;
      case 'Freqs':
      case '':
        // Channels
        row.forEach((channel, i) => {
          if (wrappedRows.includes(i)) i--;
          const frequency: TrunkedSiteFrequency = {};
          const $ = cheerio.load(channel);

          const frequencyString = $('body')
            .text()
            .replace(/\d+ /, '')
            .trim();

          if (frequencyString.includes('c')) {
            frequency.control = 'PRIMARY';
          } else if (frequencyString.includes('a')) {
            frequency.control = 'ALTERNATE';
          } else {
            frequency.control = false;
          }

          const frequencyNumber = Number(
            frequencyString.replace(/[^\d|\.]/, '')
          );

          if (Number.isNaN(frequencyNumber) || frequencyString.length === 0) {
            return;
          }

          frequency.frequency = frequencyNumber;

          // dedupe frequenciess
          if (
            typeof freqs[i].frequencies.find(
              f => f.frequency === frequency.frequency
            ) === 'undefined'
          ) {
            freqs[i].frequencies.push(frequency);
          }
        });
        break;
      case 'County':
        row.forEach((c, i) => {
          if (wrappedRows.includes(i)) return;
          const $ = cheerio.load(c);
          // handle empty county names
          const countyName = $('body').text();
          if (countyName && countyName.length > 0) {
            freqs[i].siteCounty.link = $('a').attr('href');
            freqs[i].siteCounty.name = countyName;
          } else {
          }
        });
        break;
      default:
        log.error(`No handler for table heading ${firstElem}`);
        break;
    }
  });
  return freqs.filter(site => {
    return site.frequencies.length > 0;
  });
}

function parseInfoTable($: CheerioStatic, page: Page) {
  cheerioTableparser($);

  const infoArrays = ($('.rrtable').first() as any).parsetable(
    false,
    false,
    true
  ) as any;

  infoArrays[0] = infoArrays[0].map((key: string) => {
    return camelCase(key.replace(':', '').trim());
  });

  const infoData = zipObject(...infoArrays) as Dictionary<any>;
  infoData.systemId = page.url().replace(/[^\d]/g, '');
  infoData.state = $('#rrpage td > span > a:nth-child(2)').text();
  return infoData;
}

function getTableByTitle(title: string, $: CheerioStatic) {
  const titles = $('body').find('div.title');
  const t = titles.filter((idx, el) => {
    return $(el)
      .text()
      .trim()
      .includes(title);
  });
  return $(t)
    .next('.titlebox')
    .find('table.rrtable');
}

export interface TrunkedSite {
  site?: string;
  siteId?: number;
  siteLink?: string;
  siteName?: string;
  siteCounty: { link: string; name: string };
  frequencies: TrunkedSiteFrequency[];
}

export interface TrunkedSiteFrequency {
  frequency?: number;
  control?: 'PRIMARY' | 'ALTERNATE' | false;
}

export interface TrunkedTalkgroup {
  decimal: string;
  mode: 'ANALOG' | 'DIGITAL' | 'ENCRYPTED' | 'TDMA';
  alphaTag: string;
  description: string;
  tag: string;
  group: string;
}

export interface TrunkedTalkgroups {
  [key: string]: TrunkedTalkgroup[];
}
