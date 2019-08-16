FROM node:lts-buster-slim

WORKDIR /prisma-migrate

ENV PRISMA_ENDPOINT=http://prisma:4466

RUN yarn global add prisma

COPY *.yml *.prisma *.sh ./

CMD ["./entrypoint.sh"]
