'use strict';

var InvalidNote = require('./Exception/InvalidNote.js');
var Stringify = require('./Stringify.js');

/**
 * Handles the creation and manipulationg of Western music notes.
 */
class Note {
    /**
     * Sets the note from a string.
     * @param {string} note Valid note string such as C, Ab and G#.
     * @param {integer} [octave] Integer of the octave, optional. 
     * @throw {InvalidNote} If the note is invalid.
     */
    constructor(note, octave = null) {
        this.setNote(note);
        this.setOctave(octave);
    }
    
    /**
     * Sets the note from a string. Case insensitive.
     * @param {string} note Case insensitive note string such as C, Ab and G#.
     * @throw {InvalidNote} If the note string is invalid.
     */
    setNote(note) {
        if(!Note._notes.hasOwnProperty(note)) {
            throw new InvalidNote(note + " is not a valid note");    
        }
        
        this.note = note;
    }
    
    /**
     * Returns the note without octave identifier.
     * @returns {string} The note as a string.
     */
    getNote() {
        return this.note;
    }
    
    /**
     * Sets the nth octave of the note.
     * @param {integer} n The octave integer, such as C4 for middle C.
     */
    setOctave(n) {
        if(n !== null && !Number.isInteger(n)) {
            throw new InvalidNote("Expected octave to be an integer or null"); 
        }
        
        this.octave = n;
    }
    
    /**
     * Gets the note's octave.
     * @returns {integer} The octave integer, such as C4 for middle C.
     */
    getOctave() {
        return this.octave;
    }
    
    /**
     * Returns true if the note is sharp.
     * @returns {Boolean} True if the note is sharp.
     */
    isSharp() {
        return this.note.charAt(1) === '#';
    }
    
    /**
     * Returns true if note is flat.
     * @returns {Boolean} True if the note is flat.
     */
    isFlat() {
        return this.note.charAt(1) === 'b';
    }
    
    /**
     * Checks if a note is valid. Case sensitive.
     * 
     * @param {string} note String representation of a note, such as C, Ab and G#.
     * @return {boolean} True if the note is valid, else false.
     */
    isValid(note) {
        
        return Note._notes.hasOwnProperty(note);
    }
    
    /**
     * Returns the flat representation of the note.
     * @return {string} The flat note.
     */
    getFlat() {
        var index = Note._notes[this.note]; //get index from lookup table
        
        return Note._indexToFlat[index];
    }
    
    /**
     * Returns the sharp representation of the note.
     * @return {string} The sharp note.
     */
    getSharp() {
        var index = Note._notes[this.note];
        
        return Note._indexToSharp[index];
    }
    
    /**
     * Returns true if the note is natural, ie it has no sharps or flats.
     * @return {boolean} true if no sharps or flats, else false.
     */
    isNatural() {
        return this.note.length === 1;
    }
    
    /**
     * Gets a new Note transposed to the specificed half steps. If the current
     * note is flat, it returns flat, otherwise sharp is returned.
     * @param {int} halfSteps The amount of half steps. Negative numbers transpose down, positives transpose up.
     * @return {Note} If the current note is flat, it will return a flat note,
     * else sharp is returned.
     */
    getTransposition(halfSteps) {
        var currentIndex = Note._notes[this.note];
        var index = (currentIndex + halfSteps) % 12;
        var note, octave = null;
        
        //overflow negative indexes
        if(index < 0) {
            index = 12 + index;
        }
        
        if(this.isFlat()) {
            note = Note._indexToFlat[index];
        } else {
            note = Note._indexToSharp[index];
        }
        
        //only transpose octaves if we have an octave
        if(Number.isInteger(this.getOctave())) {
            octave = this.getOctave() + Math.floor((currentIndex + halfSteps) / 12);
        }
        
        return new Note(note, octave);
    }
    
    /**
     * Transposes the current note to the specified half steps. If the current
     * note is flat, it returns flat, otherwise sharp is returned.
     * @param {integer} halfSteps The amount of half steps. Negative numbers transpose down, positives transpose up.
     * @returns {Note} Returns self.
     */
    transpose(halfSteps) {
        var transNote = this.getTransposition(halfSteps);
        
        this.setNote(transNote.getNote());
        this.setOctave(transNote.getOctave());
        
        return this;
    }
    
    toString(method = Stringify.Scientific) {
        console.log("wat");
        return method(this);
    }
};

/**
 * Lookup table to convert notes to their positional index.
 * @access private
 */
Note._notes = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4
    , 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 9, 'A': 9
    , 'A#': 10, 'Bb': 10, 'B': 11
};
      
/**
 * Lookup table to convert sharp note position to note.
 * @access private
 */
Note._indexToSharp = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G'
    , 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
}; 

/**
 * Lookup table to convert flat note position to note.
 * @access private
 */
Note._indexToFlat = {
    0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E', 5: 'F', 6: 'Gb', 7: 'G'
    , 8: 'Ab', 9: 'A', 10: 'Bb', 11: 'B'
}; 
        
module.exports = Note;