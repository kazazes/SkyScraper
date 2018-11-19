FROM nginx:latest

RUN rm -f /etc/nginx/nginx.conf && ln -s /data/skyscraper-config/conf/nginx.conf /etc/nginx/nginx.conf \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

STOPSIGNAL SIGTERM
