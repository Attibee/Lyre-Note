# Lyre Note

Utilities for validating and creating music notes.

## Installation

`npm install @lyre/note`

## Usage

```javascript
import Note from '@lyre/note'

//create a note
var note = new Note('Ab');

myNote.getSharp(); //return G#
myNote.getInterval(2); //returns whole step above
```