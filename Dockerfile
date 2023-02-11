FROM node:18.14-alpine3.17

RUN apk add --no-cache bash 

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
