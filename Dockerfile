ARG NODE_VERSION=20
ARG CLIENT_PORT=3000

# Используем официальный образ Node.js
FROM node:$NODE_VERSION-buster AS base

# Рабочая директория внутри контейнера
WORKDIR /app

FROM base AS builder

# Копируем файлы package.json и package-lock.json
# COPY [источник] [назначение]
# COPY package*.json ./

# COPY package.json yarn.lock ./
COPY package*.json ./
RUN npm install --frozen-lockfile
# RUN npm install yarn
# RUN yarn install --frozen-lockfile

COPY . .

# RUN yarn lerna bootstrap

# RUN yarn lerna bootstrap
# RUN rm -rf /app/packages/client/dist/ && yarn build --scope=client
# RUN yarn build --scope=client

RUN yarn build --scope=client

# RUN npm run build:ssr
# RUN npm run build


FROM nginx:latest AS production
WORKDIR /app

COPY --from=builder /app/packages/client/dist/ /app/
COPY --from=builder /app/packages/client/nginx.conf /etc/nginx/nginx.conf

EXPOSE $CLIENT_PORT
CMD [ "nginx", "-g", "daemon off;" ]
