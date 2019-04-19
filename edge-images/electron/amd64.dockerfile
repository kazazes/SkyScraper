FROM resin/intel-nuc-node:9

RUN sed -i '/deb http:\/\/deb.debian.org\/debian jessie-updates main/d' /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update

# Install other apt deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-utils \
    clang \
    xserver-xorg-core \
    xserver-xorg-input-all \
    xserver-xorg-video-fbdev \
    xorg \
    libxcb-image0 \
    libxcb-util0 \
    xdg-utils \
    libdbus-1-dev \
    libgtk2.0-dev \
    libnotify-dev \
    libgnome-keyring-dev \
    libegl1-mesa \
    libegl1-mesa-drivers \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    libglapi-mesa \
    libgles1-mesa \
    libgles2-mesa \
    libglu1-mesa \
    libopenvg1-mesa \
    libdbus-1-dev \
    libgtk2.0-dev \
    libnotify-dev \
    libtxc-dxtn-s2tc0 \
    xserver-xorg-video-intel \
    mesa-utils \
    mesa-utils-extra \
    libva-drm1 \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    freeglut3-dev \
    libgconf2-dev \
    libasound2-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    libxss1 \
    libnss3-dev \
    libsmbclient \
    libssh-4 \
    fbset \
    libexpat-dev && rm -rf /var/lib/apt/lists/*

RUN echo "#!/bin/bash" > /etc/X11/xinit/xserverrc \
  && echo "" >> /etc/X11/xinit/xserverrc \
  && echo 'exec /usr/bin/X -s 0 dpms -nocursor -nolisten tcp "$@"' >> /etc/X11/xinit/xserverrc

# Move to app dir
WORKDIR /usr/src/app

# Move package.json to filesystem
COPY ./app/package.json ./

# Install npm modules for the application
RUN JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && \
  rm -rf /tmp/* && node_modules/.bin/electron-rebuild

# Move app to filesystem
COPY ./app ./

## uncomment if you want systemd
ENV INITSYSTEM on

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
