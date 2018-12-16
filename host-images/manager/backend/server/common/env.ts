import dotenv from "dotenv";
import { existsSync } from "fs";

if (existsSync("./.env")) {
  dotenv.config();
} else {
  dotenv.config({ path: "/data/conf/manager/production.env" });
}
