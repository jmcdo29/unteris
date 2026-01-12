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

FROM unteris-common AS migrations-build
COPY apps/cli ./apps/cli
COPY libs/server ./libs/server
COPY libs/db ./libs/db
COPY libs/shared ./libs/shared/
RUN pnpm nx run cli:build:production

FROM unteris-node AS migrations-prod
LABEL description="The image that runs migrations for the Unteris Database. This should be ran as one-off commands on demand"
USER node
WORKDIR /src
COPY --from=migrations-build --chown=node:node /src/dist ./dist
RUN cp ./dist/apps/cli/package.json ./package.json
COPY pnpm-workspace.yaml ./
ENV NODE_ENV=production
RUN pnpm i
CMD ["dumb-init", "node", "dist/apps/cli/main", "migrate"]
