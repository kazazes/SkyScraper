import { TrunkedSystem } from "./systemParser";
import { type } from "os";
import _ = require("lodash");
import consola from "consola";
import TrunkedSystems from "../TrunkedSystems";

export class RadioReferenceStats {
  systems: TrunkedSystem[];
  constructor(trunkedSystems: TrunkedSystems) {
    this.systems = trunkedSystems.serialized;
  }

  systemsByType() {
    const types: {[key: string]: number } = {};
    this.systems.forEach((sys) => {
      if (typeof types[sys.systemType] === 'undefined') {
        types[sys.systemType] = 1;
      } else {
        types[sys.systemType] += 1;
      }
    });
    return types;
  }

  printSystemsByType() {
    const types = _.toPairs(this.systemsByType()) as Array<[string, number]>;
    types.sort((a, b) => {
      return (b[1] - a[1]);
    });

    consola.info(`Network Type\t\t\tSystem Count`)
    types.forEach((type) => {
      consola.info(`${type[0]}\t\t\t${type[1]}`)
    });
  }
}
