import { DeepSpeech } from "../src/deepspeech";

const ds = new DeepSpeech();

ds.transcribe("./t1.wav", (err, val) => {
  console.log(val);
  console.error(err);
});
