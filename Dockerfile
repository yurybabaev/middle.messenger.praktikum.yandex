FROM node:16
WORKDIR /usr/src/app
COPY dist dist
COPY server.js server.js
RUN npm install --no-save express dotenv
EXPOSE 3000
CMD node server.js