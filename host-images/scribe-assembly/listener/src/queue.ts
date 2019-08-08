import Queue, { Job } from "bull";
import log from "./log";

const transcriptionQueue = new Queue("transcriptionQueue",
  {
    redis: { host: process.env.REDIS_HOST, },

  })

export function addToQueue(message: any) {
  transcriptionQueue.add(message);
}

transcriptionQueue.process(async (job: Job, done) => {
  const result = await fetch(`http://${process.env.ASSEMBLY_HOST}`,
    {
      method: "POST",
      body: job.toString(),
      headers: {
        contentType: "application/json"
      }
    });

  if (result.status === 429) {
    return done(new Error(result.statusText))
  }

  log.info(JSON.stringify(result.body, null, 2))
  done(null, result);
})
