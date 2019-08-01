#! /bin/bash

set -e
set -x

mkdir -p /data/jupyter/work
rm -rf /home/jovyan/work
ln -s /data/jupyter/work /home/jovyan/
chown -R 1000:100 /data/jupyter
