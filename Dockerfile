# Файл для тестов с запуском без docker-compose

ARG NODE_VERSION=20
ARG SERVER_PORT=3000

FROM node:$NODE_VERSION-buster AS base

WORKDIR /app

FROM base AS builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
# RUN yarn install

COPY . .

RUN yarn lerna bootstrap
RUN rm -rf /app/packages/server/dist/ && yarn build --scope=server
COPY /packages/server/dist/ /app/

FROM node:$NODE_VERSION-buster-slim AS production
WORKDIR /app

COPY --from=builder /app/packages/server/dist/ /app/
COPY --from=builder /app/packages/server/package.json /app/package.json
RUN yarn install --production=true

EXPOSE $SERVER_PORT
CMD [ "node", "/app/index.js" ]
# CMD ["sh", "-c", "tail -f /dev/null"]  # Контейнер будет работать в фоне


