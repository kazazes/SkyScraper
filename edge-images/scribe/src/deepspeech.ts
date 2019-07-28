const MemoryStream = require("memory-stream");
const Ds = require("deepspeech");
const Wav = require("node-wav");
import Fs from "fs";
import Sox from "sox-stream";
import { Duplex } from "stream";
import { PathLike } from "fs";
import { DoneCallback } from "bull";
import log from "./util/log";

// These constants control the beam search decoder
// Beam width used in the CTC decoder when building candidate transcriptions
const BEAM_WIDTH = 500;
// The alpha hyperparameter of the CTC decoder. Language Model weight
const LM_ALPHA = 0.75;
// The beta hyperparameter of the CTC decoder. Word insertion bonus.
const LM_BETA = 1.85;
// These constants are tied to the shape of the graph used (changing them changes
// the geometry of the first layer), so make sure you use the same constants that
// were used during training
// Number of MFCC features to use
const N_FEATURES = 26;
// Size of the context window used for producing timesteps in the input vector
const N_CONTEXT = 9;

const dir = process.env.DEEPSPEECH_MODEL_DIR;
const modelPath = `${dir}/output_graph.pbmm`;
const alphabetPath = `${dir}/alphabet.txt`;
const lmPath = `${dir}/lm.binary`;
const triePath = `${dir}/trie`;

export default class DeepSpeech {
  model: any;

  constructor() {
    this.model = new Ds.Model(
      modelPath,
      N_FEATURES,
      N_CONTEXT,
      alphabetPath,
      BEAM_WIDTH
    );
    this.model.enableDecoderWithLM(
      alphabetPath,
      lmPath,
      triePath,
      LM_ALPHA,
      LM_BETA
    );
  }

  transcribe(path: PathLike, done: DoneCallback) {
    if (!Fs.existsSync(path)) {
      log.error("File not found " + path);
      done(new Error("File not found"));
    }

    const buffer = Fs.readFileSync(path);
    const result = Wav.decode(buffer);

    if (result.sampleRate < 16000) {
      console.error(
        "Warning: original sample rate (" +
          result.sampleRate +
          ") is lower than 16kHz. Up-sampling might produce erratic speech recognition."
      );
    }

    function bufferToStream(buffer: Buffer) {
      const stream = new Duplex();
      stream.push(buffer);
      stream.push(null);
      return stream;
    }

    const audioStream = new MemoryStream();
    bufferToStream(buffer)
      .pipe(
        Sox({
          global: {
            "replay-gain": "off",
            "no-dither": true,
          },
          output: {
            bits: 16,
            rate: 16000,
            channels: 1,
            encoding: "signed-integer",
            endian: "little",
            compression: 0.0,
            type: "raw",
          },
        })
      )
      .pipe(audioStream);

    audioStream.on("finish", () => {
      const audioBuffer = audioStream.toBuffer();

      const audioLength = (audioBuffer.length / 2) * (1 / 16000);
      console.log("audio length", audioLength);

      const result = this.model.stt(
        audioBuffer.slice(0, audioBuffer.length / 2),
        16000
      );

      done(null, result);
    });
  }
}
