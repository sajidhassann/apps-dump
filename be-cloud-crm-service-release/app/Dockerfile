FROM node:18-slim as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules && yarn install --frozen-lockfile --development

COPY . .

RUN npx prisma generate

# RUN yarn test

RUN apt-get update || : && apt-get install python3 -y
RUN apt install python3-pip -y





RUN yarn build
#RUN npx prisma db push
#
#FROM node:18.0.0-alpine3.14  as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN rm -rf node_modules && yarn install --frozen-lockfile --production
#
#COPY . .
#
#COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
