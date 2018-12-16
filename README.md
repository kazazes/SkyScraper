## CI/CD Steps

![CI/CD](/docs/CD.png)

## Generate dockerfiles for arm64 and x86

```bash
./scripts/gen-dockerfiles.sh
```

### Build docker images locally

```bash
./scripts/docker-build.sh
```

### Fetch Google Cloud Build images, sync with Docker Hub

```bash
./scripts/sync-containers.sh
```

## Meta

**Peter Kazazes** – [@pkpolls](https://twitter.com/pkpolls)
