'use strict';

/**
 * Converts a Note object to scientific notation, such as C5, B2, etc.
 * @param {Note} note The note to stringify.
 * @returns {string} The note string.
 */
function scientificStringify(note) {
    return note.getNote() + note.getOctave();
}

/**
 * Converts a Note object to Helmholtz notation.
 * @param {Note} note The note to stringify.
 * @returns {string} The note string.
 */
function helmholtzStringify(note) {
    var octave = note.getOctave();
    
    //set note
    if(octave >= 3) {
        var note = note.getNote().toLowerCase();
        var suffix = "\'".repeat(octave - 3);
    } else {
        var note = note.getNote().toUpperCase();
        var suffix = ",".repeat(Math.abs(2 - octave));
    }
    
    return note + suffix;
}

/**
 * Converts a Note object into a string.
 * @param {Note} note The note to stringify.
 * @param {integer|function} type Stringify.SCIENTIFIC or Stringify.HELMHOLTZ or a function that returns a string and accepts a Note object as its parameter.
 * @returns {string} The stringified note.
 */
function Stringify(note, type = Stringify.SCIENTIFIC) {
    //number flag
    if(typeof type === "number") {
        if(type === Stringify.SCIENTIFIC) {
            return scientificStringify(note);
        } else if(type === Stringify.HELMHOLTZ) {
            return helmholtzStringify(note);
        } else {
            throw type + " is an invalid stringify type flag.";
        }
    //function passed in
    } else if(typeof type === "object") {
        return type(note);
    //all other types invalid
    } else {
        throw "Invalid type parameter " + typeof type;
    }
}

/**
 * Scientific notation flag
 */
Stringify.SCIENTIFIC = 0;

/**
 * Helmholtz notation flag
 */
Stringify.HELMHOLTZ = 1;

module.exports = Stringify;