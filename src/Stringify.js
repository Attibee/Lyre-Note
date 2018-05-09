'use strict';

/**
 * Converts a Note object into a string.
 * @param {Note} note The note to stringify.
 * @param {function} method Callback to stringify the note, such as Stringify.Scientific or Stringify.Helmholtz
 * @returns {string} The stringified note.
 */
function Stringify(note, method = Stringify.Scientific) {
    return method(note);
}

/**
 * Converts a Note object to scientific notation, such as C5, B2, etc.
 * @param {Note} note The note to stringify.
 * @returns {string} The note string.
 */
Stringify.Scientific = function(note) {
    if(Number.isInteger(note.getOctave())) {
        return note.getNote() + note.getOctave();
    } else {
        return note.getNote();
    }
};

/**
 * Converts a Note object to Helmholtz notation.
 * @param {Note} note The note to stringify.
 * @returns {string} The note string.
 */
Stringify.Helmholtz = function(note) {
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
};

module.exports = Stringify;