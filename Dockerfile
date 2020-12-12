FROM node:14.15.0-alpine3.11 As dev

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

COPY config ./config

RUN npm install --silent

COPY . .

RUN npm run build

FROM node:14.15.0-alpine3.11 as production

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

COPY config ./config

RUN npm install --only=prod --silent

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
