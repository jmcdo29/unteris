FROM postgres:15.3 as postgres-prod

LABEL description="A custom postgres image that has ulids built in as an extension with binary representation and the ability to retreive the timestamp from them." 

RUN apt update

RUN apt install -y --no-install-recommends curl ca-certificates

RUN apt upgrade -y

RUN curl -OJL https://github.com/pksunkara/pgx_ulid/releases/download/v0.1.1/pgx_ulid-v0.1.1-pg15-$(dpkg --print-architecture)-linux-gnu.deb && \
  apt install ./pgx_ulid-v0.1.1-pg15-$(dpkg --print-architecture)-linux-gnu.deb

WORKDIR /home/postgres

ENV HOME=/home/postgres
ENV PATH=/home/postgres/.cargo/bin:$PATH

RUN chown postgres:postgres /home/postgres

USER postgres
