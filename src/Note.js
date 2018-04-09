'use strict';

var InvalidNote = require('./Exception/InvalidNote.js');

/**
 * Handles the creation and manipulationg of Western music notes.
 */
class Note {
    /**
     * Sets the note from a string. Case insensitive.
     * @param {string} note Case insensitive note string such as C, Ab and G#.
     * @throw {InvalidNote} If the note string is invalid.
     */
    constructor(note) {
        this.setNote(note);
    }
    
    /**
     * Sets the note from a string. Case insensitive.
     * @param {string} note Case insensitive note string such as C, Ab and G#.
     * @throw {InvalidNote} If the note string is invalid.
     */
    setNote(note) {
        if(typeof note !== "string") {
            throw new InvalidNote("Expected note parameter to be string");
        }
        
        var matches = note.match(/^([a-gA-G])(b|B|#)?(\d+)?$/);
        
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
        
        this.note = letter + accidental;
        this.octave = matches[3];
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
        this.octave = parseInt(n);
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
        
        //overflow negative indexes
        if(index < 0) {
            index = 12 + index;
        }
        
        if(this.isFlat()) {
            return new Note(Note._indexToFlat[index]);
        } else {
            return new Note(Note._indexToSharp[index]);
        }
    }
    
    /**
     * Transposes the current note to the specified half steps. If the current
     * note is flat, it returns flat, otherwise sharp is returned.
     * @param {integer} halfSteps The amount of half steps. Negative numbers transpose down, positives transpose up.
     * @returns {Note} Returns self.
     */
    transpose(halfSteps) {
       this.setNote(this.getTransposition(halfSteps).toString());
       
       return this;
    }
    
    /**
     * Converst the Note to its string.
     * @returns {String} The note string.
     */
    toString() {
        return this.note;
    }
};

/**
 * Lookup table to convert notes to their positional index.
 * @access private
 */
Note._notes = {
    'A': 0, 'A#': 1, 'Bb': 1, 'B': 2, 'C': 3, 'C#': 4, 'Db': 4
    , 'D': 5, 'D#': 6, 'Eb': 6, 'E': 7, 'F': 8, 'F#': 9, 'Gb': 9
    , 'G': 10, 'G#': 11, 'Ab': 11
};
      
/**
 * Lookup table to convert sharp note position to note.
 * @access private
 */
Note._indexToSharp = {0: 'A', 1: 'A#', 2: 'B', 3: 'C', 4: 'C#', 5: 'D'
    , 6: 'D#', 7: 'E', 8: 'F', 9: 'F#', 10: 'G', 11: 'G#'}; 

/**
 * Lookup table to convert flat note position to note.
 * @access private
 */
Note._indexToFlat = {0: 'A', 1: 'Bb', 2: 'B', 3: 'C', 4: 'Db', 5: 'D'
    , 6: 'Eb', 7: 'E', 8: 'F', 9: 'Gb', 10: 'G', 11: 'Ab'}; 
        
module.exports = Note;