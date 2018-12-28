FROM pckzs/pybombs

RUN apt-get update \
  && apt-get install -y netcat \
  && rm -rf /var/lib/apt/lists/*

RUN . /usr/local/setup_env.sh \
  && pybombs install soapybladerf

RUN git clone https://github.com/rxseger/rx_tools \
  && cd rx_tools \
  && mkdir build \
  && cd build \
  && cmake .. \
  && make -j$(nproc) \
  && make install \
  && ldconfig \
  && cd .. \
  && rm -rf rx_tools

RUN git clone https://github.com/simonyiszk/csdr.git csdr \
  && cd csdr \
  && git checkout eabc2c5 \
  && make -j$(nproc) \
  && make install \
  && cd .. \
  && rm -rf csdr

RUN git clone https://github.com/simonyiszk/openwebrx /webrx \
  && cd /webrx \
  && git checkout 4e30fd5

WORKDIR /webrx
COPY config_webrx.py .

CMD [ "python2", "openwebrx.py" ]
