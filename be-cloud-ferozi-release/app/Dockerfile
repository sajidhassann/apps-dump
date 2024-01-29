FROM node:20-alpine3.17  as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules && yarn install --frozen-lockfile --development

COPY . .

RUN npx prisma generate

RUN yarn test

RUN yarn build


CMD ["node", "dist/main"]

