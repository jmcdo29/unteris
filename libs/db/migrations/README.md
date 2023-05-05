# db-migrations

This "library" is used by the kysely-cli to run migrations for the database on
deploys to production. There is a watchman process watching for this image's
updates.

## Database Design

```mermaid
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
        string image_url
        string category
        string location
    }
    Domain {
        string name
        string id
        string description
        string type
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
