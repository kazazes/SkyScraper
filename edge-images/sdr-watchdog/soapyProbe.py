from SoapySDR import Device
from mqttClient import MyMQTTClass
from json import dumps

client = MyMQTTClass()
client.run()


class SoapySDRProbe:
    def probe():
        results = Device.enumerate()
        client.loop()
        resultsAsDict = []
        for result in results:
            asDict = result.asdict()
            resultsAsDict.append(asDict)

        json = dumps(resultsAsDict)
        client.publish('device/sdr/connected',
                       json, 1)
        client.loop()
        return json


SoapySDRProbe().probe()
