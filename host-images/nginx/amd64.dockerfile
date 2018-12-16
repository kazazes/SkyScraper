FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
CMD [ "nginx -t && ", nginx", "-g", "daemon off;" ]
