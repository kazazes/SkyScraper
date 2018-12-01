# stage-1: build dist folder
FROM node:alpine as build
WORKDIR /usr/src/app
RUN apk add python
COPY ["package.json", "yarn.lock", "/usr/src/app/"]
RUN yarn install --pure-lockfile
COPY . .
RUN yarn build

# stage-2: copy static files to nginx image
FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
