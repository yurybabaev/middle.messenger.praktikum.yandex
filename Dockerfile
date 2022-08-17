FROM node:16-alpine
WORKDIR /usr/src/app
COPY src src
COPY static static
COPY server.js server.js
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY webpack.config.js webpack.config.js
COPY declarations.d.ts declarations.d.ts
COPY tsconfig.json tsconfig.json
RUN npm install
RUN npm run build
EXPOSE 3000
CMD node server.js