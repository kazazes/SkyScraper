import express from "express";
import hostController from "./host";

export default express
  .Router()
  .get("/usb", hostController.usbDevices)
  .get("/sdr", hostController.sdrDevices);
