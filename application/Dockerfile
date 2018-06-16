FROM node:9.4.0-alpine as builder

ARG db="database"

RUN apk add --no-cache make gcc g++ python

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app

COPY package-lock.json /usr/src/app

RUN npm install
RUN npm rebuild bcrypt --build-from-source

RUN npm install pm2 -g

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
EXPOSE 443

CMD ["pm2-docker", "start", "ecosystem.config.js", "--env", "production"]

# # Dockerfile to build `binary` image which will have everything packages like dependenecies and codes.
# # This image can be configured and run with environment variables.
# FROM node:9.4.0-alpine as builder

# # Add build tools necessary for npm installations.
# RUN apk add --no-cache make gcc g++ python

# WORKDIR /application

# # Add package.json for dependency installation.
# ADD ./package.json ./package.json
# # Install all dependencies.
# RUN npm install --only=production

# # Release docker image
# # As the last stage.
# FROM node:9.4.0-alpine as release

# WORKDIR /application

# # Add the codes and other stuff to the application folder.
# ADD . .
# # Remove node_modules older just in case..
# RUN rm -rf /application/node_modules
# # Copy the dependency installation from the builder image.
# COPY --from=builder /application/node_modules /application/node_modules

# # Indicate that we use 8080. Maybe configurable.
# EXPOSE 3000
# EXPOSE 443

# CMD ["ls", "-la"]
# # Start the application.
# CMD ["npm", "run", "prod"]
