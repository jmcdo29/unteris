# Unteris

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

<p style="text-align: center;"><img src="./apps/site/public/vitoak.png" width="450"></p>

## Welcome to the World

Unteris is a D&D Homebrew setting written and developed by my partner. All
credit for information about the world goes to them. This repository is the
website that I am working on for displaying the information they come up with
to make it easier to track changes, and share the information with other
players and Dungeon Masters as the campaign setting grows.

## The (Code) Design

Currently, the front end is being written in React while using NestJS as the
server side framework all withhin this wonderful Nx monorepo. nest-commander is
being used as a CLI builder to integrate with Kysely to handle migrations via
its own "application" in Nx's terms. Migrations are written to their own
library directory, and all new react components go into separate libraries as
well to help keep builds short making use of Nx's computational caching.

Eventually this will all be hosted on AWS as well.

## Running Locally

If you **really** can't wait to see what this is all doing you can follow th
steps below

### Prereqs

1. NodeJS preferrably current (18 and above)
2. A package manager, I use pnpm and do not guarantee yarn or npm will work the
same
3. Docker-compose
4. Your own creativity when it comes to filling in the database as those seeds
are not yet created

### Steps

1. Clone the repo and move to the directory
2. Run `docker compose up -d` to start the database
3. Run `pnpm nx run kysely-cli:migrate` to build and run the migrations
4. Run `pnpm nx run server:serve` to start the server on port 3333
5. Run `pnpm nx run site:serve` to start the site on port 4200

> Note: technically the site and server aren't hooked together yet, but that's
the next step

## Keep in Touch

I'll be working on this in the free time that I have, as I really want to see
it all come together. Feel free to use this project as inspiration for your own
or learn how I'm connecting Nx libraries and applications together. Otherwise,
you can just watch the project and see what becomes of it. 

Any major questions I guess you can raise an issue or [email me about it][email]

[email]: mailto://me+unteris@jaymcdoniel.dev
