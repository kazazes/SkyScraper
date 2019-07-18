## Directory structure

```
.
├── Dockerfiles - Consolidated by architecture
│   ├── ARM
│   └── x86
├── base-images - Base images from which others are built
│   ├── netdata
│   ├── sdr-ubuntu
│   └── trunk-recorder
├── edge-images - The actual application containers
│   ├── config
│   ├── datadog
│   ├── dump1090
│   ├── mqtt
│   ├── nginx
│   ├── ngrok
│   ├── node-red
│   ├── redis
│   └── samba
└── scripts
```

## Generate multi-arch dockerfiles

```bash
./scripts/gen-dockerfiles.sh
```

### Build docker images locally

```bash
docker-compose -f docker-compose.amd.yml build --parallel
```

## Meta

***[SkyScraper](https://skyscraper.ai)***

**Peter Kazazes** – [@pkcodes](https://twitter.com/pkcodes)
