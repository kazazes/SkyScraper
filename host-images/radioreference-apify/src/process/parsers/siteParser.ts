// To parse this data:
//
//   import { Convert } from "./file";
//
//   const trunkedSite = Convert.toTrunkedSite(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface TrunkedSite {
  systemName: string;
  siteUniqueDBID: string;
  siteDescription: string;
  siteCountyLocation: string;
  siteNeighbors: string;
  siteLocation: string;
  siteModulation: string;
  siteNotes: string;
  range?: Range;
  siteConnectTone?: string;
  siteRan?: string;
  siteNac?: string;
  systemID?: string;
  rebanded?: string;
  zoneID?: string;
}

export interface Range {
  distance: number;
  units: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  static toTrunkedSite(json: string): TrunkedSite[] {
    return cast(JSON.parse(json), a(r('TrunkedSite')));
  }

  static trunkedSiteToJson(value: TrunkedSite[]): string {
    return JSON.stringify(uncast(value, a(r('TrunkedSite'))), null, 2);
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
  TrunkedSite: o(
    [
      { json: 'systemName', js: 'systemName', typ: '' },
      { json: 'siteUniqueDbId', js: 'siteUniqueDBID', typ: '' },
      { json: 'siteDescription', js: 'siteDescription', typ: '' },
      { json: 'siteCountyLocation', js: 'siteCountyLocation', typ: '' },
      { json: 'siteNeighbors', js: 'siteNeighbors', typ: '' },
      { json: 'siteLocation', js: 'siteLocation', typ: '' },
      { json: 'siteModulation', js: 'siteModulation', typ: '' },
      { json: 'siteNotes', js: 'siteNotes', typ: '' },
      { json: 'range', js: 'range', typ: u(undefined, r('Range')) },
      { json: 'siteConnectTone', js: 'siteConnectTone', typ: u(undefined, '') },
      { json: 'siteRan', js: 'siteRan', typ: u(undefined, '') },
      { json: 'siteNac', js: 'siteNac', typ: u(undefined, '') },
      { json: 'systemId', js: 'systemID', typ: u(undefined, '') },
      { json: 'rebanded', js: 'rebanded', typ: u(undefined, '') },
      { json: 'zoneId', js: 'zoneID', typ: u(undefined, '') },
    ],
    false
  ),
  Range: o(
    [
      { json: 'distance', js: 'distance', typ: 0 },
      { json: 'units', js: 'units', typ: '' },
    ],
    false
  ),
};
