# Migrating the PostgreSQL Version

This is a _mostly_ painless process, but it is a little time consuming, especially when it comes to dealing with containing extensions as well. In practice, we need to take a database dump. This can be done using the following command, utilizing docker so that we don't need Postgres installed locally (you can still install Postgres locally if you want)

```sh
docker run -it -v ./tmp/docker:/backup/ postgres:<major_version> pg_dump --dbname <databaseName> -h <host> -p <port> -U <user> -W -Fc -f /backup/backup.dump
```

With the dump created and stored locally in `./tmp/docker/backup.dump`, we can create a secondary dump to grab metadata and table ownership

```sh
docker run -it -v ./tmp/docker:/backup/ postgres:<major_version> pg_dumpall -g -l <databaseName> -h <host> -p <port> -U <user> -W -f /backup/globals.sql
```

This will drop the globals metadata to `./tmp/docker/globals.sql`.

Now, install the latest version of Postgres and install the extensions needed (check the ULID extension in this case and update the docker container).

With the latest extension installed we can recreate the globals in the new database

```sh
docker run -it -v ./tmp/docker:/backup/ postgres:<major_version> psql -U postgres -h <host> -p <port> -f /backup/globals.sql
```

Now create the new empty database for the rest of the migrations to be put into, same name as the original database

```sh
docker run -it -v ./tmp/docker:/backup/ postgres:<major_version> createdb -U <user> -h <host> -p <port> <databaseName>
```

And now finish the migration with restoring the dump file

```sh
docker run -it -v ./tmp/docker:/backup/ postgres:<major_version> pg_restore -U <user> -d <databaseName> -j 4 -v /backup/backup.dump -h <host> -p <port>
```
