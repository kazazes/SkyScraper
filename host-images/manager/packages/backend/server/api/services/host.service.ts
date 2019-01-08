import { identity, pickBy } from "lodash";
import usb, { Device } from "usb";
import L from "../../common/logger";

export class HostService {
  public async usbDevices() {
    L.info("usb devices");
    const devices = usb.getDeviceList();
    return devices;
  }

  public async sdrDevices() {
    L.info("sdr devices");
    const devices = usb.getDeviceList();
    const augmented = devices.map((device) => {
      // Use hexadecimal (unpadded) vendor ID
      const vendorHex = device.deviceDescriptor.idVendor.toString(16);
      L.debug("Trying USB vendor " + vendorHex);
      let sdr: { type: string };
      switch (vendorHex) {
        case "2cf0":
          // Nuand, BladeRF
          sdr = { type: "bladeRF" };
          return { sdr, device };
        case "bda":
          // Realtek RTL
          sdr = { type: "rtl" };
          return { sdr, device };
        default:
          break;
      }
    });

    // remove falsy values
    const filtered = pickBy(augmented, identity);
    // reindex at zero
    const collapsed: any[] = [];
    Object.keys(filtered).forEach((key) => {
      collapsed.push(filtered[key]);
    });

    L.debug(JSON.stringify(collapsed, null, 2));
    return collapsed;
  }
}

export default new HostService();
