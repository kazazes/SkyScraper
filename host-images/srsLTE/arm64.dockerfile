FROM pckzs/sdr-ubuntu

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends cmake libfftw3-dev libmbedtls-dev libboost-program-options-dev \
    libconfig++-dev libsctp-dev libboost-system-dev libboost-test-dev libboost-thread-dev libqwt-dev libqt4-dev

WORKDIR /src

# https://github.com/srslte/srsgui
RUN git clone https://github.com/srsLTE/srsGUI.git && \
    cd srsGUI && \
    mkdir build && \
    cd build && \
    cmake ../ && \
    make && \
    make install && \
    cd ../../ && \
    rm -rf srsGUI

RUN git clone https://github.com/srsLTE/srsLTE.git && \
    cd srsLTE && \
    mkdir build && \
    cd build && \
    cmake ../ && \
    make && \
    make test && \
    make install && \
    ./srslte_install_configs.sh service
