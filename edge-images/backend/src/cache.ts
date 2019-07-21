import { createClient } from "redis";
import { promisify } from "util";

const client = createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379
});

interface ISubArgs {
  key: string;
  callback: (channel: string, message: string) => void;
}

const subscriptions: ISubArgs[] = [];

const setAsync = promisify(client.set).bind(client);
export const set = (key: string, value: string | Object) => {
  let v = value;
  if (typeof value === "object") {
    v = JSON.stringify(value);
  }
  return setAsync(key, v);
};

const setExAsync = promisify(client.setex).bind(client);
export const setEx = (key: string, seconds: number, value: string | Object) => {
  let v = value;
  if (typeof value === "object") {
    v = JSON.stringify(value);
  }
  return setExAsync(key, seconds, v);
};

export const get = promisify(client.get).bind(client);

export const sub = ({ key, callback }: ISubArgs) => {
  subscriptions.push({ key, callback });
  client.on(key, callback);
};

export const HOUR = 60 * 60;
