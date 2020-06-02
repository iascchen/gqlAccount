# FROM node
FROM node:alpine

MAINTAINER IascCHEN

# 更新Alpine的软件源为国内（清华大学）的站点 TUNA
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.11/main/" > /etc/apk/repositories

#RUN apk update \
#    && apk add --no-cache ca-certificates \
#    && update-ca-certificates \
#    && apk add --no-cache --virtual bash bash-doc bash-completion vim wget .gyp python make g++

ARG NPM_REGISTRY="https://registry.npm.taobao.org"

EXPOSE 9000
CMD ["yarn", "prod"]

RUN yarn config set registry ${NPM_REGISTRY}
RUN yarn config get registry

WORKDIR /opt/app
COPY package.json /opt/app/package.json
COPY yarn.lock /opt/app/yarn.lock
RUN yarn

COPY . /opt/app
RUN yarn clean && yarn build
