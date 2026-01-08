# Generating a Key and IV

As we're running an aes-256-cbc encryption algorithm on the sessionToken (just to show that we can and to keep the tokens as secure as possible) each individualized instance of the server needs to have an encryption key and initialization vector (IV). This should be randomly generated once and not be easily guessed. For simplicity, it can be generated with `crypto.randomBytes(32)` and `crypto.randomBytes(16)` respectively, stored as hex strings.
