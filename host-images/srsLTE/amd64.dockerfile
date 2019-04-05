FROM pckzs/sdr-ubuntu

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
  apt-get install -y --no-install-recommends cmake libfftw3-dev libmbedtls-dev libboost-program-options-dev \
  libconfig++-dev libsctp-dev libboost-system-dev libboost-test-dev libboost-thread-dev libqwt-dev libqt4-dev

WORKDIR /src

RUN git clone --depth 1 --branch release_18_12 https://github.com/srsLTE/srsLTE.git && \
  cd srsLTE && \
  mkdir build && \
  cd build && \
  cmake -DENABLE_GUI=OFF -DENABLE_UHD=OFF -DENABLE_SOAPYSDR=OFF -DCMAKE_BUILD_TYPE=Release ../ && \
  make -j$(nproc) && \
  make -j$(nproc) install

RUN ldconfig

COPY conf /etc/srslte/
COPY entrypoint.sh /usr/local/bin

ENTRYPOINT [ "entrypoint.sh" ]
