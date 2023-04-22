# This image makes use of a Node image running on Linux Alpine
FROM node:16.16.0

# A work directory is required to be used by npm install
WORKDIR /app

COPY package*.json ./

# Makes sure npm is up to date otherwise install dependencies attempts will fail
RUN npm install -g npm@9.6.5

# Install dependencies
RUN npm install

# Copy all project files to the container
# Files in the location of this file are copied to WORKDIR in the container
COPY . .

# The process this container should run
CMD ["npm", "start"]