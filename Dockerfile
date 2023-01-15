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

COPY package*.json yarn*.json ./

# RUN yarn install --only=production
# RUN yarn prisma generate

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules

CMD yarn run start:prod

# FROM node:16.14

# WORKDIR /app
# COPY package*.json ./
# # COPY .env .

# RUN yarn install
# # RUN yarn install --only=production

# # COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma

# EXPOSE 8080
# CMD yarn run start:prod

# WORK!!!!!!!!!!!!!!!!!!!!!!!!!!
# FROM node:16.14
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . .
# RUN yarn prisma generate
# RUN yarn build
# CMD [ "node", "dist/main.js" ]

# WORK 2 !!!!!!!!!!!!!!!!!!!!!!!!!!
# FROM node:16.14
# WORKDIR /app
# COPY package*.json ./
# COPY yarn*.json ./
# COPY prisma ./prisma/
# RUN yarn install
# COPY . .
# RUN yarn build
# CMD [ "yarn", "run", "start:prod" ]