# Lyre Note

Utilities for validating and creating music notes.

## Installation

`npm install @lyre/note`

## Usage

```javascript
var Note = require('@lyre/note');

//create a note
var myNote = new Note('Db');

myNote.getSharp(); //return C#
myNote.transpose(2); //transposes a whole step up to Eb
myNote.transpose(-2); //transposes a whole step down to B
```

## API

[Visit the API documentation.](https://github.com/Attibee/Lyre-Note/wiki/Note-API)

## Test

From the root directory

`npm run test`
