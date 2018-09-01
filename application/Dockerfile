FROM node:9.4.0-alpine as applicationBuilder

ARG db="database"

RUN apk add --no-cache make gcc g++ python curl

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app

COPY package-lock.json /usr/src/app

RUN npm install
RUN npm rebuild bcrypt --build-from-source

# RUN npm install forever -g

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

#CMD ["forever", "start", "--append", "-e", "/usr/src/app/error.log", "-l", "/usr/src/app/app.log", "./src/index.js"]
CMD ["node", "./src/index.js"]
