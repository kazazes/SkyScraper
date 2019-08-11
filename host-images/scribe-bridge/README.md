# scribe-bridge
```
.
├── Dockerfile
├── bootstrap_assembly_cpu.sh
├── bootstrap_assembly_gpu.sh
├── docker-compose.yml
├── main.py
└── requirements.txt
```

Listens for transcription requests from MQTT broker and relays them to a transcription endpoint. The bootstrap scripts setup the [AssemblyAI](https://docs.assemblyai.com/on-premise/async-engine) on-prem application to run in GCE, which is then run with the included compose file.

The bridge uses the following environment variables:
```
MQTT_HOST=mqtt.skyscraper.ai # The root SkyScraper MQTT broker
MQTT_USER=edge
MQTT_PASSWORD=
TRANSCRIPTION_SERVER=transx.skyword.io # The AssemblyAI endpoint hostname and port
MAX_CONCURRENCY=5 # The script will pool requests, with x active requests
DRY_RUN=1 # This isn’t idempotent yet, this flag doesn't send the actual requests
```

Currently, this is running in GKE.
