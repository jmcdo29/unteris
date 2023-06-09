FROM node:20.2-alpine3.18 AS node-base
RUN npm i -g pnpm@8.6.1 && \
	apk add --no-cache \
	dumb-init=1.2.5-r2

FROM node-base AS common
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

################
# SERVER BUILD #
################

FROM common AS server-build
COPY apps/server ./apps/server/
COPY libs/server ./libs/server/
COPY libs/shared ./libs/shared/
RUN pnpm nx run server:build:production

################
# SERVER FINAL #
################

FROM node-base AS server-prod
USER node
WORKDIR /src
COPY --from=server-build --chown=node:node /src/dist/apps/server ./
ENV NODE_ENV=production
RUN pnpm i
CMD ["dumb-init", "node", "main.js"]

####################
# MIGRATIONS BUILD #
####################

FROM common AS migrations-build
COPY apps/kysely-cli ./apps/kysely-cli
COPY libs/server ./libs/server
COPY libs/db ./libs/db
COPY libs/shared ./libs/shared/
RUN pnpm nx run kysely-cli:build:production

####################
# MIGRATIONS FINAL #
####################

FROM node-base AS migrations-prod
USER node
WORKDIR /src
COPY --from=migrations-build --chown=node:node /src/dist ./dist
RUN cp ./dist/apps/kysely-cli/package.json ./package.json
ENV NODE_ENV=production
RUN pnpm i
CMD ["dumb-init", "node", "dist/apps/kysely-cli/main", "migrate"]

##############
# SITE BUILD #
##############

FROM common AS site-build
WORKDIR /src
COPY apps/site ./apps/site
COPY libs/ui ./libs/ui
COPY libs/shared ./libs/shared/
RUN VITE_SERVER_URL="https://api.unteris.com" pnpm nx run site:build:production

##############
# SITE FINAL #
##############

FROM caddy:2.6.4-alpine as site-prod
WORKDIR /src
COPY --from=site-build /src/dist/apps/site/ ./dist/apps/site
COPY Caddyfile ./Caddyfile
CMD ["caddy", "run", "--config", "Caddyfile"]