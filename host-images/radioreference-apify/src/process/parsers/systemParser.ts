import { TrunkedSite } from './siteParser';

// To parse this data:
//
//   import { Convert } from "./file";
//
//   const trunkedSystem = Convert.toTrunkedSystem(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface TrunkedSystem {
  systemName: string;
  location: string;
  county: string;
  systemType: string;
  systemVoice: string;
  lastUpdated: string;
  systemID: string;
  state: string;
  sites: Site[];
  talkgroups?: { [key: string]: Talkgroup[] };
  url: string;
  uniqueIdentifier: string;
}

export interface Site {
  frequencies: Frequency[];
  siteCounty: SiteCounty;
  site?: string | TrunkedSite;
  siteLink?: string;
  siteName?: string;
  siteID?: number;
}

export interface Frequency {
  control: boolean | string;
  frequency: number;
}

export interface SiteCounty {
  link?: string;
  name?: string;
}

export interface Talkgroup {
  decimal: string;
  mode?: string;
  description: string;
  tag: string;
  group: string;
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
      { json: 'systemName', js: 'systemName', typ: '' },
      { json: 'location', js: 'location', typ: '' },
      { json: 'county', js: 'county', typ: '' },
      { json: 'systemType', js: 'systemType', typ: '' },
      { json: 'systemVoice', js: 'systemVoice', typ: '' },
      { json: 'lastUpdated', js: 'lastUpdated', typ: '' },
      { json: 'systemId', js: 'systemID', typ: '' },
      { json: 'state', js: 'state', typ: '' },
      { json: 'sites', js: 'sites', typ: a(r('Site')) },
      {
        json: 'talkgroups',
        js: 'talkgroups',
        typ: u(undefined, m(a(r('Talkgroup')))),
      },
      { json: 'url', js: 'url', typ: '' },
      { json: 'uniqueIdentifier', js: 'uniqueIdentifier', typ: '' },
    ],
    false
  ),
  Site: o(
    [
      { json: 'frequencies', js: 'frequencies', typ: a(r('Frequency')) },
      { json: 'siteCounty', js: 'siteCounty', typ: r('SiteCounty') },
      { json: 'site', js: 'site', typ: u(undefined, '') },
      { json: 'siteLink', js: 'siteLink', typ: u(undefined, '') },
      { json: 'siteName', js: 'siteName', typ: u(undefined, '') },
      { json: 'siteId', js: 'siteID', typ: u(undefined, 0) },
    ],
    false
  ),
  Frequency: o(
    [
      { json: 'control', js: 'control', typ: u(true, '') },
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
  Talkgroup: o(
    [
      { json: 'decimal', js: 'decimal', typ: '' },
      { json: 'mode', js: 'mode', typ: u(undefined, '') },
      { json: 'description', js: 'description', typ: '' },
      { json: 'tag', js: 'tag', typ: '' },
      { json: 'group', js: 'group', typ: '' },
    ],
    false
  ),
};
