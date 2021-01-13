FROM node:14.15.0-alpine3.11 AS dev

ARG NODE_AUTH_TOKEN

WORKDIR /usr/src/app
COPY package*.json .npmrc ./
COPY config ./config
RUN npm config set //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
RUN npm install --silent
COPY . .
RUN npm run build


FROM node:14.15.0-alpine3.11 AS production

ARG NODE_AUTH_TOKEN

WORKDIR /usr/src/app
COPY package*.json .npmrc ./
COPY config ./config
RUN npm config set //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
RUN npm install --only=prod --silent
COPY --from=dev /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
