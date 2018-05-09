'use strict';

var InvalidNote = require("./Exception/InvalidNote.js");
var Note = require("./Note.js");

/**
 * Parses a musical note from string and returns a Note object.
 * @param {string} string The note string to parse.
 * @param {function} [method=Parse.Scientific] The callback function to parse the string, such as Parse.Scientific or Parse.Helmholtz
 * @returns {Note} The parsed note.
 */
function Parse(string, method = Parse.Scientific) {
    return method(string);
}

/**
 * Parses a note in scientific format (note followed by an integer octave).
 * @param {string} string The string to parse.
 * @returns {Note} The parsed note.
 * @throws {InvalidNote} Throws if note cannot be parsed.
 */
Parse.Scientific = function(string) {
    var matches = string.match(/^([a-gA-G])(b|B|#)?(\d+)?$/);

    if(!matches) {
        throw new InvalidNote(note + " is not a real note.");    
    }

    var letter = matches[1].toUpperCase();

    //add accidental
    if(matches[2]) {
        var accidental = matches[2];
    } else {
        var accidental = "";
    }
    
    var note = letter + accidental;
    
    if(matches[3]) {
        var octave = parseInt(matches[3]); 
    } else {
        var octave = null;
    }
    
    return new Note(note, octave);
};

/**
 * Parses a note in Helmholtz format (note letter followed by a prime mark.)
 * Prime marks are parseable if they are commas or single quotes.
 * @param {string} string The string to parse.
 * @returns {Note} The parsed note.
 * @throws {InvalidNote} Throws if note cannot be parsed.
 */
Parse.Helmholtz = function(string) {
    var matches = string.match(/^([a-gA-G])([b|B|#])?('*|,*)?$/);

    if(!matches) {
        throw new InvalidNote(note + " is not a real note.");    
    }

    var letter = matches[1];
    var accidental = matches[2] ? matches[2].toLowerCase() : '';
    var note = letter.toUpperCase() + accidental.toLowerCase();
    var octave = null;
    var isUpperCase = letter === letter.toUpperCase();

    //has suffix
    if(matches[3]) {
        var suffix = matches[3];
        
        //uppcase letter followed by a comma
        if(isUpperCase && suffix.charAt(0) === ",") {
            octave = Math.abs(2 - suffix.length)
        } else if(!isUpperCase && suffix.charAt(0) === "'") {
            octave = suffix.length + 3;
        } else {
            throw new InvalidNote(string + " has invalid mix of capitalization and prime mark.");    
        }
    } else if(isUpperCase) {
        octave = 2;
    } else {
        octave = 3;
    }
    
    return new Note(note, octave);
};

module.exports = Parse;