ARG BASE=node:16.13

#------ target dependencies
# Install dependencies only when needed
FROM ${BASE} AS dependencies

RUN curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --production=true --frozen-lockfile
RUN npx prisma generate
RUN node-prune
RUN cp -R node_modules prod_node_modules 
RUN yarn install --production=false --prefer-offline 
RUN npx prisma generate 
RUN rm -rf prisma 
RUN yarn cache clean

#------ target bulider
# Rebuild the source code only when needed
FROM ${BASE} AS builder
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build && rm -rf node_modules

#------ target production
# Production image, copy all the files and run next
FROM ${BASE} AS production
WORKDIR /app

ENV NODE_ENV production

COPY .env.example .env

COPY --from=builder /app/package.json ./package.json
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/prisma ./prisma

USER node

CMD yarn run start:migrate:prod