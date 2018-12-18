import express from "express";
import dockerController from "./docker";

export default express
  .Router()
  .get("/info", dockerController.info)
  .get("/container", dockerController.containers);
