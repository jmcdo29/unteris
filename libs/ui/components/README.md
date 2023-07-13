# ui-components

This library was generated with [Nx](https://nx.dev).

## Exposed Componented

### ErrorDisplay

A simple box that displays errors to the user with an X to dismiss them. It has
a title and displays the errors in a list.

`ErrorDisplayProps`

| prop           | type           | description                               |
| -------------- | -------------- | ----------------------------------------- |
| clearError     | (bool) => void | The method to call when closing the error |
| errorToDisplay | DisplayError   | The error object to display               |

`DisplayError`

| prop     | type     | description                   |
| -------- | -------- | ----------------------------- |
| title    | string   | The title of the error box    |
| messages | string[] | The error messages to display |

### UFormControl

A very simple wrapper around Material UI's form control. Takes in a `required`
prop and sets a specified margin

### PasswordInput

A wrapper compoenent around `<Input>` from material UI. Automatically adds caps
lock and num lock detection support, and password show toggles along with
minimum validation and information.

`PasswordProps`

| props       | type               | description                                                        |
| ----------- | ------------------ | ------------------------------------------------------------------ |
| onUpdate    | ChangeEventHandler | What to do when the input updates. Maps to `onChange` and `onBlur` |
| placeholder | string?            | The placeholder string                                             |
| label       | string?            | The label for the field, defaults to "Password"                    |
| value       | string             | The value to bind the input to                                     |
| isSignup    | boolean            | If the input is being used in sign up or login                     |

### TextInput

A light wrapper around `Input` from mui. Automatically adds labels and wraps in
a `UFormControl`.

`TextInputProps`

| prop     | type               | description                                                  |
| -------- | ------------------ | ------------------------------------------------------------ |
| value    | string             | The value to bind to the input                               |
| type     | InputProps['type'] | The type of input to use. e.g. email                         |
| onUpdate | ChangeEventHandler | What to do when the input updates. Just like `PasswordInput` |
| label    | string             | The label for the input box                                  |
| required | boolean?           | If the input is required                                     |

### Image

A helper wrapper around images that automatically links to their larger sizes in
a new tab.

`ImageProps`

| prop  | type                   | description                             |
| ----- | ---------------------- | --------------------------------------- |
| src   | string                 | The source of the image                 |
| alt   | string                 | The alternate text for the image        |
| style | Record<string, string> | Any extra styling the image should have |

### Grid

A custom Grid implementation for CSS grids instead of mui's which uses flexbox

`GridProps`

| prop     | type      | description                                         |
| -------- | --------- | --------------------------------------------------- |
| columns  | number?   | The number of columns for the grid. Defaults to 12  |
| rows     | string?   | The number of rows for the grid. Defaults to 'auto' |
| sx       | SxProps   | The styling to add to hte mui `Box`                 |
| children | ReactNode | The children of the grid                            |

### StyledLink

A guaranteed style for all links.

Takes thesame props as Typogrpahy and Link

### StyledButton

Like `StyledLink` but as a button

### ThemeSwitcher

A sweet theme switcher with tool tips and icons. Pure component with no props

### TabsWithPanel

A tab viewer that sets up the child tabs and interactions and manages vertical
vs horizontal orientation.

`TabsWithPanelProps`

| prop            | type                             | description                                           |
| --------------- | -------------------------------- | ----------------------------------------------------- |
| arialLabel      | string                           | aria compliant label                                  |
| tabIndex        | number                           | the initially active tab's index                      |
| handleTabChange | (SyntheticEvent, number) => void | What to do when the tab changes                       |
| tabElements     | {id: string, name: string}[]     | The elements for the tabs                             |
| tabPanelContent | any => JSX.Element               | The react component to display as the panel's content |
| indicator       | string?                          | The mui color theme to use for text and highlight     |
