FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./server ./server
COPY ./client ./client

WORKDIR /usr/src/app/client

RUN npm install
RUN npm run build

WORKDIR /usr/src/app/server

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
