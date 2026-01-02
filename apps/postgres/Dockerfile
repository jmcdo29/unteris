FROM postgres:18.1 AS postgres-prod

LABEL description="A custom postgres image that has ulids built in as an extension with binary representation and the ability to retrieve the timestamp from them."

RUN apt update

RUN apt install -y --no-install-recommends curl ca-certificates

RUN apt upgrade -y

RUN curl -OJL https://github.com/pksunkara/pgx_ulid/releases/download/v0.2.2/pgx_ulid-v0.2.2-pg18-$(dpkg --print-architecture)-linux-gnu.deb && \
  apt install ./pgx_ulid-v0.2.2-pg18-$(dpkg --print-architecture)-linux-gnu.deb

WORKDIR /home/postgres

ENV HOME=/home/postgres
ENV PATH=/home/postgres/.cargo/bin:$PATH

RUN chown postgres:postgres /home/postgres

COPY apps/postgres/postgresql.conf /etc/postgresql/postgresql.conf

