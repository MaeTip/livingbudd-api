FROM node:16.14 AS build

WORKDIR /app

COPY package*.json yarn*.json ./
COPY prisma ./prisma/

RUN yarn install
RUN yarn prisma generate

COPY . .

RUN yarn build


FROM node:16.14 AS deploy

WORKDIR /app

COPY package*.json .
COPY .env.example .

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules

CMD yarn run start:prod