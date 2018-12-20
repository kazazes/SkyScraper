FROM linuxserver/nginx

RUN rm -rf /config/www/*

COPY ./nginx.conf /config/nginx/nginx.conf
