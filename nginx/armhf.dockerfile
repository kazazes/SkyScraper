FROM nginx:latest

RUN rm -rf /etc/nginx/nginx.conf && ln -s /data/skyscraper-config/conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

STOPSIGNAL SIGTERM
