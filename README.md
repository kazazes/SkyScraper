### Directory structure

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
|   └── ...
├── host-images - Cloud microservices.
└── *tests, I swear*
```

## ./scripts

`gen-dockerfiles.sh` -- balena's build service uses templated Docker and compose files to manage multiple architectures. Because we're building ourselves, we have to generate the multi-arch versions manually. So, `docker-compose.yml` and all the `Dockerfile.template` files are the source of truth. Make your changes there, and regenrate the ARM and x86 versions. You can find their subsitution lingo [here](https://www.balena.io/docs/learn/develop/dockerfile/#dockerfile-templates).

`build-base-images.sh` -- We rely on an SDR driver and leaning tower of esoteric libraries to come up with an environment that will compile most of our eventual software and support a lot of hardware. It's a multi-phase build to save us years of our lives. If you modify those base images, in the `base-images` folder... just run the generate script, and then this build script will build and tag some sexy multi-arch, single image non-sense. Any applications you build on top of those will reflect those changes.

`gen-cloudbuild.sh` -- Considering the army of images floating around, it'd be tedious to have to manually edit the GC Build (`cloudbuild.yaml`) file all the time. This just adds any new recruits to the assembly line.

`build-log-stream.sh` -- This will bring up the ongoing builds in a stupid tmux window so I could kinda look cool. I ended up replacing that with Slack build notifications, a decision I would make again.

`multiarch.sh` -- Ignore.

`registry-to-balena.sh` -- Simply does the post-GC, pre-balena deployment process for you. I wrote this because Johnny Ive sold me a bad keyboard, if only he knew how important the up arrow was. This whole thing is a saga of disadvantaged DevOps. He took away my bash history, man.

### Build images locally

```bash
docker-compose -f docker-compose.amd.yml build --parallel
```

### Running locally

In VirtualBox, add a new IDE controller and a balena install image. Add a host-only network adaptor for local access.

## Meta

**_[SkyScraper](https://skyscraper.ai)_**

**Peter Kazazes** – [@pkcodes](https://twitter.com/pkcodes)
