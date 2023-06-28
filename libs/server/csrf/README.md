# server-csrf

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test server-csrf` to execute the unit tests via [Jest](https://jestjs.io).

## Flow of CSRF Requests

```mermaid
flowchart TD
    A[Browser] -->|Makes GET /csrf| B{Has active Session}
    B -->|No| C[Create Session]
    B -->|Yes| D{Has Valid CSRF Header}
    D -->|Yes| F[Continue Request]
    D -->|No| E((Error))
    C --> G[Creaet CSRF token]
    G -->|Send CSRF as response| A
```
