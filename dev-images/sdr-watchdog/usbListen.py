from pyudev import Context, Monitor, MonitorObserver
from gi import require_version
from mqttClient import MyMQTTClass
from json import dumps
from soapyProbe import SoapySDRProbe

try:
    require_version('Gtk', '3.0')
    pass
finally:
    from gi.repository import GLib, Gtk, GObject
    pass


def listen():
    context = Context()
    monitor = Monitor.from_netlink(context)
    monitor.filter_by("usb")
    observer = MonitorObserver(monitor, device_event)
    monitor.enable_receiving()
    observer.start()
    mainloop = GLib.MainLoop()
    mainloop.run()


def device_event(action, event):
    print('{0} event {1} on device', action, event)
    e = dict(action=event.action, device_node=event.device_node,
             device_type=event.device_type)
    print('{0}', e)
    client = MyMQTTClass()
    client.run()
    client.publish("device/usb/" + action, dumps(e), 0)
    client.disconnect()
    client.loop()
    soapy = SoapySDRProbe().probe()


if __name__ == "__main__":
    listen()
