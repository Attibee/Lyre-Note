# Lyre Note

Utilities to manipulate, parse and output musical notes. Lyre Note is able to perform common manipulations such as transposition of notes and conversion between sharps and flats. Functions Parse and Stringify natively support Scientific and Helmholtz notations and conversion between the two.

## Installation

`npm install @lyre/note`

## Usage

### Basic usage

```javascript
var Note = require('@lyre/note');

//create a note
var myNote = new Note('Db', 4);

myNote.getSharp(); //return C#
myNote.transpose(2); //transposes a whole step up to Eb
myNote.transpose(-2); //transposes a whole step down to B
```

### Parsing

```javascript
var Parse = require("@lyre/note").Parse;

var myScientificNote = Parse("C4"); //create middle C in scientific notation, scientific is default
var myHelmholtzNote = Parse("c'", Parse.Helmholtz); //create middle C in helmholtz notation
```

### Stringifying note objects

```javascript
var Stringify = require("@lyre/note").Stringify;
var Parse = require("@lyre/note").Parse;

var myNote = Parse("C4"); //create middle C in scientific notation
console.log( Stringify( myNote, Stringify.Helmholtz ) ); //then output in helmholtz notation

//note also has a convenience method to stringify
myNote.toString(Stringify.Helmholtz);
```

## API

[Visit the API documentation.](https://github.com/Attibee/Lyre-Note/wiki/Note-API)

## Test

From the root directory

`npm run test`
