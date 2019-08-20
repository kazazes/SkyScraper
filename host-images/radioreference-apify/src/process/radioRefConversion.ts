// To parse this data:
//
//   import { Convert } from "./file";
//
//   const trunkedSystem = Convert.toTrunkedSystem(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// https://app.quicktype.io/

export interface TrunkedSystem {
  county?: string;
  lastUpdated?: string;
  location?: string;
  sites?: Site[];
  state?: State;
  systemID?: string;
  systemName?: string;
  systemType?: SystemType;
  systemVoice?: SystemVoice;
  uniqueIdentifier: string;
  url: string;
  talkgroups?: { [key: string]: Talkgroup[] };
  systems?: System[];
}

export interface Site {
  frequencies: Frequency[];
  site?: string;
  siteCounty: SiteCounty;
  siteID?: number;
  siteLink?: string;
  siteName?: string;
}

export interface Frequency {
  control: boolean | ControlEnum;
  frequency: number;
}

export enum ControlEnum {
  Alternate = 'ALTERNATE',
  Primary = 'PRIMARY',
}

export interface SiteCounty {
  link?: string;
  name?: string;
}

export enum State {
  Alabama = 'Alabama',
  Alaska = 'Alaska',
  Arizona = 'Arizona',
  Arkansas = 'Arkansas',
  California = 'California',
  Colorado = 'Colorado',
  Connecticut = 'Connecticut',
  Delaware = 'Delaware',
  DistrictOfColumbia = 'District of Columbia',
  Empty = '',
  Florida = 'Florida',
  Georgia = 'Georgia',
  Hawaii = 'Hawaii',
  Idaho = 'Idaho',
  Illinois = 'Illinois',
  Indiana = 'Indiana',
  Iowa = 'Iowa',
  Kansas = 'Kansas',
  Kentucky = 'Kentucky',
  Louisiana = 'Louisiana',
  Maine = 'Maine',
  Maryland = 'Maryland',
  Massachusetts = 'Massachusetts',
  Michigan = 'Michigan',
  Minnesota = 'Minnesota',
  Mississippi = 'Mississippi',
  Missouri = 'Missouri',
  Montana = 'Montana',
  Nebraska = 'Nebraska',
  Nevada = 'Nevada',
  NewHampshire = 'New Hampshire',
  NewJersey = 'New Jersey',
  NewMexico = 'New Mexico',
  NewYork = 'New York',
  NorthCarolina = 'North Carolina',
  NorthDakota = 'North Dakota',
  Ohio = 'Ohio',
  Oklahoma = 'Oklahoma',
  Oregon = 'Oregon',
  Pennsylvania = 'Pennsylvania',
  PuertoRico = 'Puerto Rico',
  Register = 'Register',
  RegisterCalifornia = 'RegisterCalifornia',
  RegisterConnecticut = 'RegisterConnecticut',
  RegisterDistrictOfColumbia = 'RegisterDistrict of Columbia',
  RegisterFlorida = 'RegisterFlorida',
  RegisterIllinois = 'RegisterIllinois',
  RegisterKentucky = 'RegisterKentucky',
  RegisterMissouri = 'RegisterMissouri',
  RegisterMontana = 'RegisterMontana',
  RegisterNewMexico = 'RegisterNew Mexico',
  RegisterNorthCarolina = 'RegisterNorth Carolina',
  RegisterOklahoma = 'RegisterOklahoma',
  RegisterPuertoRico = 'RegisterPuerto Rico',
  RegisterRhodeIsland = 'RegisterRhode Island',
  RegisterSouthCarolina = 'RegisterSouth Carolina',
  RegisterTexas = 'RegisterTexas',
  RegisterVirginia = 'RegisterVirginia',
  RegisterWashington = 'RegisterWashington',
  RegisterWestVirginia = 'RegisterWest Virginia',
  RegisterWisconsin = 'RegisterWisconsin',
  RhodeIsland = 'Rhode Island',
  SouthCarolina = 'South Carolina',
  SouthDakota = 'South Dakota',
  Tennessee = 'Tennessee',
  Texas = 'Texas',
  Utah = 'Utah',
  Vermont = 'Vermont',
  VirginIslands = 'Virgin Islands',
  Virginia = 'Virginia',
  Washington = 'Washington',
  WestVirginia = 'West Virginia',
  Wisconsin = 'Wisconsin',
  Wyoming = 'Wyoming',
}

export enum SystemType {
  DMRConventionalNetworked = 'DMR Conventional Networked',
  DMRHyteraXPT = 'DMR Hytera XPT',
  DMRMotorolaCapacityPlusMultiSiteTRBO = 'DMR Motorola Capacity Plus Multi Site (TRBO)',
  DMRMotorolaCapacityPlusSingleSiteTRBO = 'DMR Motorola Capacity Plus Single Site (TRBO)',
  DMRMotorolaConnectPlusTRBO = 'DMR Motorola Connect Plus (TRBO)',
  DMRTier3 = 'DMR Tier 3',
  EDACSExtendedAddressingWESK = 'EDACS Extended Addressing w/ESK',
  EDACSNarrowband = 'EDACS Narrowband',
  EDACSNarrowbandNetworked = 'EDACS Narrowband Networked',
  EDACSNetworkedStandard = 'EDACS Networked Standard',
  EDACSNetworkedStandardWESK = 'EDACS Networked Standard w/ESK',
  EDACSStandard = 'EDACS Standard',
  EDACSStandardWESK = 'EDACS Standard w/ESK',
  EdacsScat = 'EDACS SCAT',
  IDENHarmony = 'iDEN Harmony',
  IDENStandard = 'iDEN Standard',
  LTRMultiNet = 'LTR MultiNet',
  LTRNet = 'LTR Net',
  LTRPassport = 'LTR Passport',
  LTRStandard = 'LTR Standard',
  LTRStandardAndPassport = 'LTR Standard and Passport',
  MPT1327Standard = 'MPT-1327 Standard',
  MotorolaTypeI = 'Motorola Type I',
  MotorolaTypeII = 'Motorola Type II',
  MotorolaTypeIISmartZone = 'Motorola Type II SmartZone',
  MotorolaTypeIISmartZoneOmnilink = 'Motorola Type II SmartZone Omnilink',
  MotorolaTypeIISmartnet = 'Motorola Type II Smartnet',
  MotorolaTypeIIVOC = 'Motorola Type II VOC',
  MotorolaTypeIIiHybrid = 'Motorola Type IIi Hybrid',
  NXDNIcomIDASTypeC = 'NXDN Icom IDAS Type C',
  NXDNIcomIDASTypeD = 'NXDN Icom IDAS Type D',
  NxdnNexedge4800 = 'NXDN NEXEDGE 4800',
  NxdnNexedge9600 = 'NXDN NEXEDGE 9600',
  OpenSky4800Baud = 'OpenSky 4800 baud',
  OpenSky9600Baud = 'OpenSky 9600 baud',
  Project25PhaseI = 'Project 25 Phase I',
  Project25PhaseII = 'Project 25 Phase II',
  SmarTrunkStandard = 'SmarTrunk Standard',
  TETRAStandard = 'TETRA Standard',
}

export enum SystemVoice {
  AEGISAndAnalog = 'AEGIS and Analog',
  AEGISExclusive = 'AEGIS Exclusive',
  APCO25CommonAirInterfaceExclusive = 'APCO-25 Common Air Interface Exclusive',
  Analog = 'Analog',
  AnalogAndAPCO25CommonAirInterface = 'Analog and APCO-25 Common Air Interface',
  AnalogAndNXDNDigital = 'Analog and NXDN Digital',
  DMR = 'DMR',
  IDENTDMA = 'iDEN TDMA',
  NXDNDigital = 'NXDN Digital',
  ProVoiceAndAnalog = 'ProVoice and Analog',
  ProVoiceExclusive = 'ProVoice Exclusive',
  TDMADigital = 'TDMA Digital',
  TetraDigital = 'Tetra Digital',
}

export interface System {
  name: string;
  url: string;
}

export interface Talkgroup {
  decimal: string;
  description: string;
  group: string;
  mode?: Mode;
  tag: Tag;
}

export enum Mode {
  Analog = 'ANALOG',
  Digital = 'DIGITAL',
  Encrypted = 'ENCRYPTED',
  TDMA = 'TDMA',
}

export enum Tag {
  Aircraft = 'Aircraft',
  Business = 'Business',
  Corrections = 'Corrections',
  Data = 'Data',
  Deprecated = 'Deprecated',
  EMSDispatch = 'EMS Dispatch',
  EMSTac = 'EMS-Tac',
  EMSTalk = 'EMS-Talk',
  EmergencyOps = 'Emergency Ops',
  Federal = 'Federal',
  FireDispatch = 'Fire Dispatch',
  FireTac = 'Fire-Tac',
  FireTalk = 'Fire-Talk',
  Ham = 'Ham',
  Hospital = 'Hospital',
  Interop = 'Interop',
  LawDispatch = 'Law Dispatch',
  LawTac = 'Law Tac',
  LawTalk = 'Law Talk',
  Media = 'Media',
  Military = 'Military',
  MultiDispatch = 'Multi-Dispatch',
  MultiTac = 'Multi-Tac',
  MultiTalk = 'Multi-Talk',
  Other = 'Other',
  PublicWorks = 'Public Works',
  Railroad = 'Railroad',
  Schools = 'Schools',
  Security = 'Security',
  Transportation = 'Transportation',
  Utilities = 'Utilities',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  static toTrunkedSystem(json: string): TrunkedSystem[] {
    return cast(JSON.parse(json), a(r('TrunkedSystem')));
  }

  static trunkedSystemToJson(value: TrunkedSystem[]): string {
    return JSON.stringify(uncast(value, a(r('TrunkedSystem'))), null, 2);
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(typ: any, val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(typ, val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  TrunkedSystem: o(
    [
      { json: 'county', js: 'county', typ: u(undefined, '') },
      { json: 'lastUpdated', js: 'lastUpdated', typ: u(undefined, '') },
      { json: 'location', js: 'location', typ: u(undefined, '') },
      { json: 'sites', js: 'sites', typ: u(undefined, a(r('Site'))) },
      { json: 'state', js: 'state', typ: u(undefined, r('State')) },
      { json: 'systemId', js: 'systemID', typ: u(undefined, '') },
      { json: 'systemName', js: 'systemName', typ: u(undefined, '') },
      {
        json: 'systemType',
        js: 'systemType',
        typ: u(undefined, r('SystemType')),
      },
      {
        json: 'systemVoice',
        js: 'systemVoice',
        typ: u(undefined, r('SystemVoice')),
      },
      { json: 'uniqueIdentifier', js: 'uniqueIdentifier', typ: '' },
      { json: 'url', js: 'url', typ: '' },
      {
        json: 'talkgroups',
        js: 'talkgroups',
        typ: u(undefined, m(a(r('Talkgroup')))),
      },
      { json: 'systems', js: 'systems', typ: u(undefined, a(r('System'))) },
    ],
    false
  ),
  Site: o(
    [
      { json: 'frequencies', js: 'frequencies', typ: a(r('Frequency')) },
      { json: 'site', js: 'site', typ: u(undefined, '') },
      { json: 'siteCounty', js: 'siteCounty', typ: r('SiteCounty') },
      { json: 'siteId', js: 'siteID', typ: u(undefined, 0) },
      { json: 'siteLink', js: 'siteLink', typ: u(undefined, '') },
      { json: 'siteName', js: 'siteName', typ: u(undefined, '') },
    ],
    false
  ),
  Frequency: o(
    [
      { json: 'control', js: 'control', typ: u(true, r('ControlEnum')) },
      { json: 'frequency', js: 'frequency', typ: 3.14 },
    ],
    false
  ),
  SiteCounty: o(
    [
      { json: 'link', js: 'link', typ: u(undefined, '') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
    ],
    false
  ),
  System: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'url', js: 'url', typ: '' },
    ],
    false
  ),
  Talkgroup: o(
    [
      { json: 'decimal', js: 'decimal', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'group', js: 'group', typ: '' },
      { json: 'mode', js: 'mode', typ: u(undefined, r('Mode')) },
      { json: 'tag', js: 'tag', typ: r('Tag') },
    ],
    false
  ),
  ControlEnum: ['ALTERNATE', 'PRIMARY'],
  State: [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    '',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Puerto Rico',
    'Register',
    'RegisterCalifornia',
    'RegisterConnecticut',
    'RegisterDistrict of Columbia',
    'RegisterFlorida',
    'RegisterIllinois',
    'RegisterKentucky',
    'RegisterMissouri',
    'RegisterMontana',
    'RegisterNew Mexico',
    'RegisterNorth Carolina',
    'RegisterOklahoma',
    'RegisterPuerto Rico',
    'RegisterRhode Island',
    'RegisterSouth Carolina',
    'RegisterTexas',
    'RegisterVirginia',
    'RegisterWashington',
    'RegisterWest Virginia',
    'RegisterWisconsin',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Islands',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ],
  SystemType: [
    'DMR Conventional Networked',
    'DMR Hytera XPT',
    'DMR Motorola Capacity Plus Multi Site (TRBO)',
    'DMR Motorola Capacity Plus Single Site (TRBO)',
    'DMR Motorola Connect Plus (TRBO)',
    'DMR Tier 3',
    'EDACS Extended Addressing w/ESK',
    'EDACS Narrowband',
    'EDACS Narrowband Networked',
    'EDACS Networked Standard',
    'EDACS Networked Standard w/ESK',
    'EDACS Standard',
    'EDACS Standard w/ESK',
    'EDACS SCAT',
    'iDEN Harmony',
    'iDEN Standard',
    'LTR MultiNet',
    'LTR Net',
    'LTR Passport',
    'LTR Standard',
    'LTR Standard and Passport',
    'MPT-1327 Standard',
    'Motorola Type I',
    'Motorola Type II',
    'Motorola Type II SmartZone',
    'Motorola Type II SmartZone Omnilink',
    'Motorola Type II Smartnet',
    'Motorola Type II VOC',
    'Motorola Type IIi Hybrid',
    'NXDN Icom IDAS Type C',
    'NXDN Icom IDAS Type D',
    'NXDN NEXEDGE 4800',
    'NXDN NEXEDGE 9600',
    'OpenSky 4800 baud',
    'OpenSky 9600 baud',
    'Project 25 Phase I',
    'Project 25 Phase II',
    'SmarTrunk Standard',
    'TETRA Standard',
  ],
  SystemVoice: [
    'AEGIS and Analog',
    'AEGIS Exclusive',
    'APCO-25 Common Air Interface Exclusive',
    'Analog',
    'Analog and APCO-25 Common Air Interface',
    'Analog and NXDN Digital',
    'DMR',
    'iDEN TDMA',
    'NXDN Digital',
    'ProVoice and Analog',
    'ProVoice Exclusive',
    'TDMA Digital',
    'Tetra Digital',
  ],
  Mode: ['ANALOG', 'DIGITAL', 'ENCRYPTED', 'TDMA'],
  Tag: [
    'Aircraft',
    'Business',
    'Corrections',
    'Data',
    'Deprecated',
    'EMS Dispatch',
    'EMS-Tac',
    'EMS-Talk',
    'Emergency Ops',
    'Federal',
    'Fire Dispatch',
    'Fire-Tac',
    'Fire-Talk',
    'Ham',
    'Hospital',
    'Interop',
    'Law Dispatch',
    'Law Tac',
    'Law Talk',
    'Media',
    'Military',
    'Multi-Dispatch',
    'Multi-Tac',
    'Multi-Talk',
    'Other',
    'Public Works',
    'Railroad',
    'Schools',
    'Security',
    'Transportation',
    'Utilities',
  ],
};

const data = require('../../rr-all.json');
const trunkedSystem = Convert.toTrunkedSystem(JSON.stringify(data));
