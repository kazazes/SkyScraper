FROM balenalib/odroid-xu4

# Install other apt deps
RUN apt-get update && apt-get install -y --no-install-recommends \
  apt-utils \
  curl \
  dbus \
  wget \
  xserver-xorg-core \
  xserver-xorg-legacy \
  xserver-xorg-input-all \
  xserver-xorg-video-fbdev \
  x11-xserver-utils \
  xorg \
  chromium \
  chromium-sandbox \
  libxcb-image0 \
  libxcb-util0 \
  xdg-utils \
  libdbus-1-dev \
  libcap-dev \
  libxtst-dev \
  libxss1 \
  lsb-release \
  fbset \
  libexpat-dev && rm -rf /var/lib/apt/lists/*

RUN echo "#!/bin/bash" > /etc/X11/xinit/xserverrc \
  && echo "" >> /etc/X11/xinit/xserverrc \
  && echo 'exec /usr/bin/X -s 0 dpms -nocursor -nolisten tcp "$@"' >> /etc/X11/xinit/xserverrc

# Move to app dir
WORKDIR /usr/src/app

# Move app to filesystem
COPY ./app ./

# Input
ENV UDEV=1

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
