FROM node:20.2-alpine3.18 as unteris-node


RUN npm i -g pnpm@8.6.10 && \
	apk add --no-cache \
	dumb-init=1.2.5-r2

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
	./
ENV CYPRESS_INSTALL_BINARY=0
RUN pnpm i

FROM unteris-common AS server-build
COPY apps/server ./apps/server/
COPY libs/server ./libs/server/
COPY libs/shared ./libs/shared/
RUN pnpm nx run server:build:production

FROM unteris-node AS server-prod
LABEL description="The server side code for the Unteris website. It runs a NestJS server and connects to a redis and postgres database"
USER node
WORKDIR /src
COPY --from=server-build --chown=node:node /src/dist/apps/server ./
ENV NODE_ENV=production
RUN pnpm i
CMD ["dumb-init", "node", "main.js"]
