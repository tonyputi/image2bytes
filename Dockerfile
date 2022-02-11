FROM node:16-alpine

LABEL maintainer="Filippo Sallemi <fsallemi@nomadnt.com>"

RUN npm install -g @vue/cli

EXPOSE 8080