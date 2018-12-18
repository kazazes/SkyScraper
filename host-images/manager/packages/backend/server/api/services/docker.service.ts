import L from "../../common/logger";

import { Docker } from "node-docker-api";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

export class DockerService {
  public async info() {
    L.info("docker info");
    const info = await docker.info();
    return info;
  }

  public async containers() {
    L.info("docker container info");
    const containers = await docker.container.list();
    return containers;
  }
}

export default new DockerService();
