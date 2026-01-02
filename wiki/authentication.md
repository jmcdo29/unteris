# Authentication

Token based authentication

## Flow

1. Client sends username and password
2. Server verifies username password combination
3. Server creates short lived token for future requests
4. Server creates longer lived refresh token to return as a Cookie
   1. SameSite=Strict
   2. Secure=True in production
5. Client can send token in `Authentication: Bearer <token>` header format

## Token

- Opaque token, the session id (might be a hash of it)
- check the session to see if
  1. it's valid
  2. it's active
- If all is good, add the userId to the session object on the request

## Benefits of header

- Not susceptible to CSRF
- Can restrict the refresh cookie to a singular path

## Notes

- session is only created after login. Before login there's no need for a tracked session
