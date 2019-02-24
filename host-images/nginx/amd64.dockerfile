FROM alpine:3.7

RUN apk add nginx && rm  -rf /tmp/* /var/cache/apk/* && mkdir -p /run/nginx/

COPY mime.types nginx.conf proxy.conf /etc/nginx/

EXPOSE 80 443

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
