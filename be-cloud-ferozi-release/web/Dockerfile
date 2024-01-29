# Build Stage
FROM node:20-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./

ARG ENV

COPY .env.${ENV} ./.env

COPY . .
RUN yarn install
RUN yarn build
ENV NODE_ENV=production

CMD ["npm", "start"]
