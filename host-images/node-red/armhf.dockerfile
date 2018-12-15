FROM nodered/node-red-docker:rpi-v8

RUN npm install node-red-contrib-resinio \
  node-red-dashboard \
  node-red-contrib-credentials \
  node-red-node-redis \
  node-red-node-watson

COPY ./settings.js /data/settings.js
