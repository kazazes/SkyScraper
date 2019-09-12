import { ls } from "shelljs";
import { realpath, realpathSync } from "fs";

let dataDirs = ls("../../data/");

dataDirs = dataDirs.sort();

const mostRecent = dataDirs[0];

const path = realpathSync(`../data/${mostRecent}`);


