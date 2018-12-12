FROM resin/odroid-xu4-ubuntu:xenial as pybombs-slim

RUN [ "cross-build-start" ]

# Set prefix variables
ENV PyBOMBS_prefix skyscraper
ENV PyBOMBS_init /usr/local/

# Update apt-get and install some dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  automake \
  git \
  libarmadillo-dev \
  libgnutls28-dev \
  libmatio-dev \
  libpugixml-dev \
  pkg-config \
  python3-apt \
  python3-dev \
  python3-pip \
  python3-setuptools \
  python3-yaml \
  python-mako \
  python3-mako \
  python-six \
  python3-six \
  swig \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PyBOMBS
RUN pip3 install --upgrade pip
RUN pip3 install git+https://github.com/gnuradio/pybombs.git

# Apply a configuration
RUN pybombs auto-config \
  && pybombs config makewidth $(nproc) \
  && pybombs recipes add-defaults

# Customize configuration of some recipes
RUN echo "vars:\n  config_opt: \"-DENABLE_OSMOSDR=ON -DENABLE_FMCOMMS2=ON -DENABLE_PLUTOSDR=ON -DENABLE_AD9361=ON -DENABLE_RAW_UDP=ON -DENABLE_PACKAGING=ON -DENABLE_UNIT_TESTING=OFF -DPYTHON_EXECUTABLE=/usr/bin/python3\"\n" >> /root/.pybombs/recipes/gr-recipes/gnss-sdr.lwr \
  && echo "vars:\n  config_opt: \" -DINSTALL_LIB_DIR=\$prefix/lib -DENABLE_PYTHON3=ON\"\n" >> /root/.pybombs/recipes/gr-recipes/uhd.lwr \
  && sed -i '/cppunit/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/gsl/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/alsa/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/wxpython/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/thrift/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/pygtk/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/pycairo/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/pyqt4/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/qwt/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/gitbranch/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/vars/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/config_opt/d' /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/ssl/d' /root/.pybombs/recipes/gr-recipes/apache-thrift.lwr \
  && echo "gitbranch: v3.7.13.4\n" >> /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && echo "vars:\n  config_opt: \"-DENABLE_GR_AUDIO=OFF -DENABLE_GR_CHANNELS=OFF -DENABLE_GR_COMEDI=OFF -DENABLE_GR_DIGITAL=ON -DENABLE_DOXYGEN=OFF -DENABLE_GR_DTV=OFF -DENABLE_GR_FEC=OFF -DENABLE_GR_TRELLIS=OFF -DENABLE_GR_VIDEO_SDL=OFF -DENABLE_GR_VOCODER=ON -DENABLE_GR_WAVELET=OFF -DENABLE_GR_ZEROMQ=ON -DENABLE_GR_ANALOG=ON -DENABLE_GR_FFT=ON -DENABLE_GR_FILTER=ON -DENABLE_GRC=OFF\"\n" >> /root/.pybombs/recipes/gr-recipes/gnuradio.lwr \
  && sed -i '/gitrev/d' /root/.pybombs/recipes/gr-recipes/gr-iio.lwr \
  && sed -i 's/git+git:\/\/git.osmocom.org\/gr-osmosdr/git+https:\/\/github.com\/Nuand\/gr-osmosdr.git/' ~/.pybombs/recipes/gr-recipes/gr-osmosdr.lwr \
  && echo "gitbranch: master\n" >> /root/.pybombs/recipes/gr-recipes/gr-iio.lwr \
  && pybombs prefix init ${PyBOMBS_init} -a ${PyBOMBS_prefix}

RUN apt-get -qq update \
  && pybombs -vv install --deps-only gnuradio gr-osmosdr bladeRF gr-iqbal \
  && apt-get clean && rm -rf /var/lib/apt/lists/* \
  && rm -rf ${PyBOMBS_init}/src/*

# Setup environment
RUN echo "export PYTHONPATH=\"\$PYTHONPATH:/pybombs/lib/python3.5/dist-packages\"" >> ${PyBOMBS_init}/setup_env.sh \
  && echo "source "${PyBOMBS_init}"/setup_env.sh" > /root/.bashrc \
  && . ${PyBOMBS_init}/setup_env.sh

# Install optional drivers via Pybombs
RUN apt-get -qq update \
  && pybombs -p ${PyBOMBS_prefix} -v install gnuradio gr-osmosdr bladeRF gr-iqbal \
  && apt-get clean && rm -rf /var/lib/apt/lists/* \
  && rm -rf ${PyBOMBS_init}/src/*

RUN rm -rf /tmp/* /var/tmp/*

WORKDIR /home
CMD ["bash"]

RUN [ "cross-build-end" ]
