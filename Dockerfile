#from what image is built
FROM node:latest
#creating app directory
WORKDIR /app
#copying dependencies file
COPY package*.json ./
#installing dependencies
RUN npm install
#bundling app source
COPY . .
#map to docker daemon
EXPOSE 3000
#running command
CMD ["node", "index.js"]