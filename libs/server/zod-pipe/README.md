# server-zod-pipe

This library allows the use of `zod` as a schema validator instead of something
like `class-validator` with `class-transformer`. To use it, every DTO should
`extend ZodDtoClass` so that the `static schema` property can be read by the
`ZodValidiationPipe`. The pipe will validate the data through `schema.safeParse`
and it will add a `.data` property to the `body`,`query`, or `param` object that
is being validated, so that Typescript will understand what the data type is.
