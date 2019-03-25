#! /bin/bash

set -e

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)
PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

NUMBER=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

bust_caches() {
  cd $1

  sed -i -e "s/CACHEBUST=.*/CACHEBUST=$NUMBER/" \
    Dockerfile.template

  cd $PROJECT_DIR
}

for D in ./host-images/*; do
  if [ -d "${D}" ]; then
    bust_caches ${D}
  fi
done

exec $PROJECT_DIR/scripts/gen-dockerfiles.sh
