import { ls } from 'shelljs';
import { TrunkedSystem } from './parsers/systemParser';
import Table from 'cli-table';

const dataRoot = process.cwd() + '/data/';

let dataFolders = ls(dataRoot);

let systems = mostRecentSystems();

console.log(`Loaded ${systems.length} systems.`);

const systemTypeWhitelist = [
  'Project 25 Phase II',
  'Project 25 Phase I',
  'Motorola Type II Smartnet',
  'Motorola Type II SmartZone',
  'Motorola Type I',
  'Motorola Type II',
  'Motorola Type IIi Hybrid',
  'Motorola Type II SmartZone Omnilink',
];

pruneSystems();

const states: { [key: string]: number } = {};
systems.forEach(s => {
  if (states[s.state] === undefined) {
    states[s.state] = 0;
  }
  states[s.state]++;
});

const t = new Table({ head: ['State', 'Count'] });
t.push(
  ...Object.keys(states)
    .map(s => [s, states[s]])
    .sort((t1, t2) => {
      const _1 = t1 as [string, number];
      const _2 = t2 as [string, number];
      return _2[1] - _1[1];
    })
);
console.log(t.toString());

function pruneSystems() {
  console.log(`Removing unsupported systems.`);
  const { filteredSystemTypes, systemTypes } = filterSystems(systems);
  console.log(`Systems kept:\n${printSystems(systemTypes)}`);
  console.log(`Discarded systems:\n${printSystems(filteredSystemTypes)}`);
  console.log(`${systems.length} remain`);
}

function printSystems(systems: { [key: string]: number }) {
  const mapped = Object.keys(systems)
    .map(sysType => {
      return [sysType, systems[sysType]];
    })
    .sort((t1, t2) => {
      const _1 = t1 as [string, number];
      const _2 = t2 as [string, number];
      return _2[1] - _1[1];
    });
  const table = new Table({ head: ['Type', 'Count'] });
  table.push(...mapped);
  return table.toString();
}

export function filterSystems(systems: TrunkedSystem[]) {
  const filteredSystemTypes: { [key: string]: number } = {};
  const systemTypes: {
    [key: string]: number;
  } = {};
  systems = systems.filter(s => {
    if (typeof s.systemType === 'undefined') {
      throw new Error('System type undefined');
    }
    if (systemTypeWhitelist.includes(s.systemType)) {
      if (systemTypes[s.systemType] === undefined)
        systemTypes[s.systemType] = 0;
      systemTypes[s.systemType]++;
      return true;
    }
    if (filteredSystemTypes[s.systemType] === undefined)
      filteredSystemTypes[s.systemType] = 0;
    filteredSystemTypes[s.systemType]++;
    return false;
  });
  return { filteredSystemTypes, systemTypes, systems };
}

function mostRecentSystems() {
  const mostRecent = dataFolders.tail().trim();
  let savedSystems: {
    items: TrunkedSystem[];
  } = require(`${dataRoot}/${mostRecent}/systems.json`);
  let systems = savedSystems.items;
  return systems;
}
