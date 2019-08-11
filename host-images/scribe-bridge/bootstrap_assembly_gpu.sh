#!/bin/bash

export MODELSERVER_IMAGE=quay.io/assemblyai-onprem/model-server:3.0.1_default_gpu v

set -e
set -x

cd $(mktemp -d)

apt-get update
apt-get install --no-install-recommends -y jq dirmngr

# Add NVIDIA package repositories
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.0.130-1_amd64.deb
dpkg -i cuda-repo-ubuntu1804_10.0.130-1_amd64.deb
apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
apt-get update
wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
apt-get install -y ./nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
apt-get install -y nvidia-driver-410

# Install NVIDIA driver
apt-mark hold nvidia-driver-410

# Reboot. Check that GPUs are visible using the command: nvidia-smi
# Your Driver Version should show as 410.104

# Add the package repositories
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey |
  apt-key add -
distribution=$(
  . /etc/os-release
  echo $ID$VERSION_ID
)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list |
  tee /etc/apt/sources.list.d/nvidia-docker.list
apt-get update

# Install nvidia-docker2 and reload the Docker daemon configuration
apt-get install -y nvidia-docker2

cat <<EOT >/etc/docker/daemon.json
{
    "default-runtime": "nvidia",
    "runtimes": {
        "nvidia": {
            "path": "nvidia-container-runtime",
            "runtimeArgs": []
        }
    }
}
EOT

pkill -SIGHUP dockerd

# Test nvidia-smi with the latest official CUDA image
docker run --runtime=nvidia --rm nvidia/cuda:9.0-base nvidia-smi

curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

useradd -G docker --shell /bin/bash --create-home spire

echo "export MODELSERVER_IMAGE=$MODELSERVER_IMAGE" >>/etc/profile

su - spire
cd ~

docker login -u="assemblyai-onprem+skyscraper_trial" -p="56TW7MX6LPK4HGUT7IHGGRYV6RCE54W2KF1G44BXPFJYRXBWJDS7H13DM80AYUGM" quay.io

docker pull ${MODELSERVER_IMAGE}
curl -o docker-compose.yml https://gist.githubusercontent.com/kazazes/f04ac32c9f44ffc1df2bf9ee5798b58d/raw/c63b0ec63166a8cffe7adc5611b616a9dd63b549/asdf.yml

source /etc/profile

docker-compose up
