FROM node:latest

WORKDIR /app

COPY index.js ./
COPY main.js ./
COPY poids.json ./

COPY package.json ./

RUN npm install && npm install pg

RUN node main.js

CMD [ "node", "index.js" ]