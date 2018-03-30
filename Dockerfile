# Node.js version
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# get the npm modules that need to be installed
COPY package.json /usr/src/app/

RUN npm install

# copy the source files from host to container
COPY . /usr/src/app
