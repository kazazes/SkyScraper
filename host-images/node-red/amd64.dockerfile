FROM nodered/node-red-docker:v8

RUN npm install node-red-contrib-resinio \
  node-red-dashboard \
  node-red-contrib-credentials

COPY ./settings.js /data/settings.js
