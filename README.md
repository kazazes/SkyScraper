### Build considerations

- balena will build docker containers all day long for you, which is nice, but they don't cache layers and are run on constrained servers. If you're lucky it's a 30 minute process.
- Considering the size of this codebase and the release rate, building _and_ pushing to a registry from a dev machine is also cumbersome.
- I know it's classic "DevOps" overengineering, but the only lean and efficient way of getting this done is to:

1. Push to the GitHub master branch.
2. Google Cloud Build gets a call, and goes to work with caches a'blazing, crushing a dozen builds in parallel.
3. Those are pushed to a private registry on Google's container registry.
4. From the dev machine, you then manually deploy to balena with a magical incantation of:
   `sudo balena deploy --registry-secrets registry-secrets.yml skyscraper-x86`
5. All of their cli operations insist on using sudo, and believe me it's true. These guys are geniuses, it does seems silly... The registry secrets file is the GC container credential, which you can generate from gcloud cli tool.
6. balena will now fetch the baked images from GC, and this time takes into account the cache because they're dealing with final images rather than transient layers.
7. Now, if your compose file fits their striped-down spec, balena will begin rolling out deployments. It doesn't mean what anyone else would think it means.
8. Google can compile this is ~10 minutes for the SDR applications, and another 10 for the web interface. With 100 free build minutes a day, we end up oweing them a few bucks and the cost of transit.
9. Without a local environment to test on, you start rooting for the VPS after a few rounds. Jokes aside, having the fifteen minutes from push to deploy is a great way to find a little bug that forces you back to square one.

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
│   └── samba
│   └── scripts
└── *tests, I swear*
```

The frontend and data broker are [here](https://github.com/SkyScraperAI/skyscraper-manager). They're too dear to bear the chaos you're about to catch a ranfull of.

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

Before running this for the first time, I would do the same command with the `pull` verb instead to prime your cache and save you a solid lunch hour.

### Running locally

This will sound insane, but I can't do it. On my Linux dev machine, I get pretty close. I can run trunk recorder and our UI, but at the end of the day I save no time relative to what's above, considering the build process is much longer on my laptop.

On top of that, we're not exactly running this on a stock Ubuntu install on the NUC. There is a lot of nuance to balena's slimmed down Docker. Inter-container comms have to be identical to what they'd be on device, bind mounts work in real docker of course, but don't exist there. They support less than half of a compose service's parameters, and outsource process supervision to another monstrocity of a node server. I didn't think I'd be able to come up with a reasonably similar dev environment... but I got very close!

Here's the half solution, which maybe someone can improve upon: download an OS image for an x86 machine from balena, open up VMWare or whatever and get it booted. There's a whole bunch of hidden options you have to find and more non-obviousness, but there's a singular outdated blog post about how to do this specifically. It's totally possible. At that point, however, your USB is traversing half a dozen virtualized speed bumps, so any of the RF value is lost. The computational overhead of virtualizing is significant, and you have to go through the entire deploy process anyway because there's no direct access to the edge supervisor on balenaOS because it's so locked down. Network stuff is near impossible with a virtual NIC and the host machine as another hop. All balena traffic is routed through a VPN.

## Conclusion

Change a Dockerfile template, run gen script. Push, wait for the slack ding and redirect the images to balena. Wash, rinse, repeat.

The build process for the web interface is just as bad as this, but the saving grace there is that we can fetch live data OTA from the backend on the box; a misplaced := walrus can't ruin your day over in the frontend.

## Meta

**_[SkyScraper](https://skyscraper.ai)_**

**Peter Kazazes** – [@pkcodes](https://twitter.com/pkcodes)
