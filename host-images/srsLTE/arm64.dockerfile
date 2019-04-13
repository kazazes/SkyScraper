FROM skyscraperai/sdr-ubuntu

ENV INITSYSTEM on

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
  apt-get install -y --no-install-recommends cmake libfftw3-dev libmbedtls-dev \
  libconfig++-dev libsctp-dev libboost-all-dev libqwt-dev libqt4-dev libmbedtls10 \
  libsctp1 sudo iptables

WORKDIR /src

RUN git clone --depth 1 --branch release_18_12 https://github.com/srsLTE/srsLTE.git && \
  cd srsLTE && \
  mkdir build && \
  cd build && \
  cmake -DCMAKE_BUILD_TYPE=Debug -DBUILD_STATIC=TRUE ../ && \
  make -j$(nproc) && \
  make -j$(nproc) install

RUN ldconfig

COPY conf /etc/srslte/
COPY entrypoint.sh /usr/local/bin

CMD [ "entrypoint.sh" ]
# CMD [ "bash" ]
