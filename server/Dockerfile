
# Set nginx base image
FROM nginx:alpine as webserverBuild

# File Author / Maintainer
MAINTAINER Jamie Kimmell

RUN apk add --no-cache curl

# Copy custom configuration file from the current directory
COPY phoenix.net.jkimmell.com.key.pem /etc/nginx/phoenix.net.jkimmell.com.key.pem
COPY phoenix.net.jkimmell.com.full.pem /etc/nginx/phoenix.net.jkimmell.com.full.pem
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["echo", "'here'"]
CMD ["nginx", "-g", "daemon off;"]
