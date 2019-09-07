import Apify from 'apify';
import TrunkedSystems from './TrunkedSystems';
import TrunkedSites from './TrunkedSites';
import { Dictionary } from 'lodash';
import { TrunkedSystem, Site } from './parsers/systemParser';
import {
  writeFileSync,
  readFileSync,
  mkdirSync,
  existsSync,
  createWriteStream,
  statSync,
  unlinkSync,
} from 'fs';
import dotenv from 'dotenv';
import consola from 'consola';
import archiver from 'archiver';
import moment from 'moment';
import { RadioReferenceStats } from './parsers/stats';
import ProgressBar from 'progress';

const envConfig = dotenv.parse(readFileSync('.env'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const dateStr = moment()
  .utc()
  .format('MM-DD-YYYY');

const dataDir = `data/${dateStr}`;
const sitesFile = `${dataDir}/sites.json`;
const systemsFile = `${dataDir}/systems.json`;

async function run() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  const { systemData, siteData } = await fetchDatasets();

  const systems = new TrunkedSystems(systemData.items);
  const sites = new TrunkedSites(siteData.items);
  systems.setSerialized(mapSystemToSites(systems, sites));
  const byState = systems.systemsByState();
  writeDataByState(byState);

  const stats = new RadioReferenceStats(systems);
  stats.printSystemsByType();

  zipDirectory(dataDir, `${dataDir}/${dateStr}.zip`);
}

function zipDirectory(source: string, out: string) {
  const zipExists = existsSync(out);
  if (zipExists) unlinkSync(out);

  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

function mapSystemToSites(systems: TrunkedSystems, sites: TrunkedSites) {
  const p = new ProgressBar(':bar', { total: systems.serialized.length });
  consola.info('Mapping systems to sites.');
  return systems.serialized.map(system => {
    if (!system.sites) {
      consola.warn(`${system.systemName} has no sites.`);
      return system;
    }

    system.sites = (system.sites as Site[]).map(s => {
      if (s.siteID) {
        const match = sites.siteWithId(s.siteID);
        if (!match) {
          consola.warn(`No site with ID: ${s.siteID}`);
          return s;
        }
        s.site = match;
        return s;
      } else {
        return s;
      }
    });
    p.tick();
    return system;
  });
}

async function fetchDatasets(forceDownload?: boolean) {
  consola.info('Fetching datasets.');
  let systemData, siteData;
  if (
    !forceDownload &&
    existsSync(dataDir) &&
    existsSync(sitesFile) &&
    existsSync(systemsFile)
  ) {
    const systemFileStats = statSync(systemsFile);
    const siteFileStats = statSync(sitesFile);

    consola.info('Reading from local files:');
    consola.info(
      `\t${systemsFile}: ${Number(systemFileStats.size / 1000000.0).toFixed(
        1
      )}MB`
    );
    consola.info(
      `\t${sitesFile}: ${Number(siteFileStats.size / 1000000.0).toFixed(1)}MB`
    );

    systemData = JSON.parse(readFileSync(systemsFile).toString());
    siteData = JSON.parse(readFileSync(sitesFile).toString());
  } else {
    const systemDataset = `radioref-systems-${dateStr}`;
    const siteDataset = `radioref-sites-${dateStr}`;
    consola.log(`Fetching datasets ${siteDataset} & ${systemDataset}`);
    systemData = await fetchApifyDataset(systemDataset);
    siteData = await fetchApifyDataset(siteDataset);
    writeDataset(systemData, 'systems');
    writeDataset(siteData, 'sites');
  }
  return { systemData, siteData };
}

async function fetchApifyDataset(name: string) {
  const dataset = await Apify.openDataset(name, {
    forceCloud: process.env.APIFY_CLOUD === '1',
  });
  const data = await dataset.getData({
    format: 'json',
  });
  return data;
}

function writeDataByState(states: Dictionary<TrunkedSystem[]>) {
  if (!existsSync(`${dataDir}/states/`)) {
    mkdirSync(`${dataDir}/states`);
  }
  return Object.keys(states).map(key => {
    if (key === '') key = 'unknown';
    const statePath = `${dataDir}/states/${key}.json`;
    consola.log(`Writing ${key} to ${statePath}`);
    return writeFileSync(statePath, JSON.stringify(states[key], null, 2));
  });
}

function writeDataset(dataset: any, name: string) {
  writeFileSync(`${dataDir}/${name}.json`, JSON.stringify(dataset, null, 2));
}

run();
