import { TrunkedSystem, Convert } from './radioRefConversion';
class RadioReferenceData {
  serialized: TrunkedSystem[];
  constructor(data: string | object) {
    if (typeof data === 'string') {
      this.serialized = Convert.toTrunkedSystem(data);
    } else {
      this.serialized = Convert.toTrunkedSystem(JSON.stringify(data));
    }
  }
}
