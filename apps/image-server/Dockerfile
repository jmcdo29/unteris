FROM node:24-alpine3.22 AS unteris-node


RUN npm i -g pnpm@10&& \
  apk add --no-cache \
  dumb-init=1.2.5-r3

FROM unteris-node AS unteris-common

WORKDIR /src
RUN apk add --no-cache \
  python3 \
  make \
  gcc \
  g++
COPY package.json \
  tsconfig* \
  nx.json \
  pnpm-lock.yaml \
  pnpm-workspace.yaml \
  ./
ENV CYPRESS_INSTALL_BINARY=0
RUN pnpm i

FROM unteris-common AS image-server-build
COPY apps/image-server ./apps/image-server/
COPY libs/server ./libs/server/
COPY libs/shared ./libs/shared/
RUN pnpm nx run image-server:build:production

FROM unteris-node AS image-server-prod
LABEL description="The image processing serve code for the Unteris website. It runs a NestJS server and connects to a redis and postgres database"
USER node
WORKDIR /src
COPY --from=image-server-build --chown=node:node /src/dist/apps/image-server ./
COPY pnpm-workspace.yaml ./
ENV NODE_ENV=production
RUN pnpm i
CMD ["dumb-init", "node", "main.js"]
