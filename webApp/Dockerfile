FROM node:12.10.0

LABEL maintainer="Hakan Hueriyet <hakanhueriyet@gmail.com>"

ENV ANGULAR_CLI_VERSION 10.2.0


COPY package*.json ./

# Install local dependecies
RUN npm install

# Install Global Angular CLI
RUN npm install -g @angular/cli@${ANGULAR_CLI_VERSION}

# Install Firefox ESR
RUN apt-get update \
    && apt-get install -y firefox-esr \
    && rm -rf /var/lib/apt/lists/*
