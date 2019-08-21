import Apify from 'apify';
import TrunkedSystems from './TrunkedSystems';
import TrunkedSites from './TrunkedSites';
import { Dictionary } from 'lodash';
import { TrunkedSystem } from './parsers/systemParser';
import {
  writeFileSync,
  writeFile,
  readFileSync,
  mkdirSync,
  existsSync,
  PathLike,
  createWriteStream,
} from 'fs';
import { promisify } from 'util';
import dotenv from 'dotenv';
import consola from 'consola';
import archiver from 'archiver';

const envConfig = dotenv.parse(readFileSync('.env'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const dateStr = new Date().toLocaleDateString().replace(/\//g, '-');
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

  zipDirectory(dataDir, `data/${dateStr}.zip`);
}

function zipDirectory(source: string, out: string) {
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
  return systems.serialized.map(system => {
    if (!system.sites) {
      consola.warn(`${system.systemName} has no sites.`);
      return system;
    }
    system.sites = system.sites.map(s => {
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
    return system;
  });
}

async function fetchDatasets(forceDownload?: boolean) {
  let systemData, siteData;
  if (
    !forceDownload &&
    existsSync(dataDir) &&
    existsSync(sitesFile) &&
    existsSync(systemsFile)
  ) {
    systemData = JSON.parse(readFileSync(systemsFile).toString());
    siteData = JSON.parse(readFileSync(sitesFile).toString());
  } else {
    systemData = await fetchApifyDataset('radioref');
    siteData = await fetchApifyDataset('radioref-sites');
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
    return writeFileSync(
      `${dataDir}/states/${key}.json`,
      JSON.stringify(states[key], null, 2)
    );
  });
}

function writeDataset(dataset: any, name: string) {
  writeFileSync(`${dataDir}/${name}.json`, JSON.stringify(dataset, null, 2));
}

run();
