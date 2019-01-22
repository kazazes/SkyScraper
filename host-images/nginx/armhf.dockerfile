FROM nginx
COPY mime.types /etc/nginx/
COPY nginx.conf proxy.conf /etc/nginx/
