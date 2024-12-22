FROM node:20

WORKDIR /server
COPY package*.json .
RUN npm install
COPY . .
CMD npm start
