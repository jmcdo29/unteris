# db-migrations

This "library" is used by the kysely-cli to run migrations for the database on
deploys to production. There is a watchman process watching for this image's
updates.

## Database Design

```mermaid
%%diagram.mmd

erDiagram
    DeityCategory ||--|{ Deity : "contains"
    Deity ||--|{ Deity_Domain : "belongs to"
    Domain ||--|{ Deity_Domain : "belongs to"
    Deity ||--|| Location : "resides in"
    DeityCategory {
        string name
        string id
    }
    Deity {
        string name
        string id
        string description
        string imageUrl
        string category_id
        string location_id
    }
    Domain {
        string name
        string id
        string description
    }
    Deity_Domain {
        string deity_id
        string domain_id
    }
    Location {
        string id
        string name
        string description
    }


```
