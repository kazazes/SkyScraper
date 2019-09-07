import { TrunkedSystem, Convert } from './parsers/systemParser';
import { groupBy } from 'lodash';
export default class TrunkedSystems {
  serialized: TrunkedSystem[];
  constructor(data: string | object | Buffer) {
    if (typeof data === 'string') {
      this.serialized = Convert.toTrunkedSystem(data);
    } else if (Buffer.isBuffer(data)) {
      this.serialized = Convert.toTrunkedSystem(data.toString());
    } else {
      this.serialized = Convert.toTrunkedSystem(JSON.stringify(data));
    }
    console.log(`Serialized ${this.serialized.length} trunked systems`);
  }

  systemsByState() {
    return groupBy(this.serialized, 'state');
  }

  setSerialized(systems: TrunkedSystem[]) {
    this.serialized = systems;
  }
}
