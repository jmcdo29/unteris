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

FROM unteris-common AS site-build
ARG SERVER_URL=https://api.unteris.com
WORKDIR /src
COPY apps/site ./apps/site
COPY libs/ui ./libs/ui
COPY libs/shared ./libs/shared/
RUN VITE_SERVER_URL=$SERVER_URL pnpm nx run site:build:production

FROM caddy:2.6.4-alpine as site-prod
LABEL description="The Unteris website image, ran via a Caddy reverse proxy"
WORKDIR /src
COPY apps/site/robots.txt ./dist/apps/site/robots.txt
COPY --from=site-build /src/dist/apps/site/ ./dist/apps/site
COPY Caddyfile ./Caddyfile
CMD ["caddy", "run", "--config", "Caddyfile"]
