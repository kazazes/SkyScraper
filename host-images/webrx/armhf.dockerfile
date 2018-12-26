FROM pckzs/pybombs-arm

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

COPY src/csdr ./csdr

RUN cd csdr \
  && make -j$(nproc) \
  && make install \
  && cd .. \
  && rm -rf csdr

COPY src/webrx .

CMD [ "python2", "openwebrx.py" ]
