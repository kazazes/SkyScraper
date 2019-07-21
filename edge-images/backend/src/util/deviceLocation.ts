import * as cache from "../cache";
import { v4 as ip } from "public-ip";
import { lookup } from "geoip-lite";

export default async () => {
  const cAddr = await cache.get("api:device:location");
  if (cAddr === null) {
    const addr = await ip();
    const location = lookup(addr);
    cache.setEx("api:device:location", cache.HOUR, location);
    cache.setEx("api:device:ip", cache.HOUR, addr);
    return location;
  } else {
    return JSON.parse(cAddr);
  }
};
