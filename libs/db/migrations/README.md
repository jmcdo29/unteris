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
    Race ||--|{ Racial_Ability : "belongs to"
    User_Account ||--|{ Login_Method : "can have"
    Local_Login |o--|| Login_Method : "is a"
    User_Account ||--|{ User_Permission : "should have"
    Verification_Tokens ||--|| User_Account : "relates to"
    Role ||--|{ User_Permission : "relates_to"
    DeityCategory {
        string name
        ulid id
    }
    Deity {
        string name
        ulid id
        string description
        string image_url
        string category
        string location
    }
    Domain {
        string name
        ulid id
        string description
        string type
    }
    Deity_Domain {
        ulid deity_id
        ulid domain_id
    }
    Location {
        ulid id
        string name
        string description
    }
    Race {
        ulid id
        string name
        string description
        string age_description
        string size_description
        string type
        integer speed
        string known_languages
    }
    Racial_Ability {
        ulid id
        ulid race_id
        string name
        string description
    }
    User_Account {
        ulid id
        string name
        string email
        boolean isVerified
        string photo_url
    }
    User_Permission {
        ulid id
        ulid user_id
        ulid role_id
    }
    Login_Method {
        ulid id
        ulid user_id
        string name
    }
    Local_Login {
        ulid id
        string password
        ulid login_method_id
        timestamp last_used
        int attempts
    }
    Role {
        ulid id
        string name
    }
    Verification_Token {
        ulid id
        string token
        ulid user_id
        timestamp expires_at
        string type
    }

```
