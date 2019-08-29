import Docker, { Container } from "dockerode";
import { statSync } from "fs";
import log from "../../log";

import stream, { PassThrough } from "stream";
const loghose = require("docker-loghose");

const socketPath = process.env.DOCKER_SOCKET || "/var/run/docker.sock";
const stats = statSync(socketPath);

if (!stats.isSocket()) {
  throw new Error("Are you sure the docker is running?");
}

const docker = new Docker({
  socketPath,
});

export async function listContainers() {
  return docker.listContainers({});
}

export function getLoghose() {
  const loghoseOpts = {
    json: true,
    docker: { socketPath },
    includeCurrentContainer: false,
  };

  const hose = loghose(loghoseOpts);
  return hose;
}

/**
 * Get logs from running container
 */
export async function containerLogs(container: Container) {
  // create a single stream for stdin and stdout
  const logStream = new stream.PassThrough();

  const logs = await container
    .logs({
      follow: true,
      stdout: true,
      stderr: true,
    })
    .then((stream) => {
      container.modem.demuxStream(stream, logStream, logStream);
      stream.pipe(logStream);
    })
    .catch((err) => {
      log.error(err);
    });

  return logStream;
}

export function containerLogsById(id: string) {
  const container = docker.getContainer(id);
  return containerLogs(container);
}
