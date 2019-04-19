FROM balenalib/odroid-xu4-alpine:3.9

RUN apk add nginx && rm -rf /tmp/* /var/cache/apk/* && mkdir -p /run/nginx/

COPY mime.types nginx.conf proxy.conf /etc/nginx/

EXPOSE 80 443 81

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
