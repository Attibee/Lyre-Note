export default class Note {
    /**
     * Sets the note from a string. Case insensitive.
     * @param {string} Case insensitive note string such as C, Ab and G#.
     * @throw {InvalidNote} If the note string is invalid.
     */
    constructor(note) {
        /**
         * Lookup table to convert notes to their positional index.
         */
        this.notes = {
            'A': 0, 'A#': 1, 'Bb': 1, 'B': 2, 'C': 3, 'C#': 4, 'Db': 4
            , 'D': 5, 'D#': 6, 'Eb': 6, 'E': 7, 'F': 8, 'F#': 9, 'Gb': 9
            , 'G': 10, 'G#': 11, 'Ab': 11
        };
        
        /**
         * Lookup table to convert sharp note position to note.
         */
        this.indexToSharp = {0: 'A', 1: 'A#', 2: 'B', 3: 'C', 4: 'C#', 5: 'D'
            , 6: 'D#', 7: 'E', 8: 'F', 9: 'F#', 10: 'G', 11: 'G#'}; 
        
        /**
         * Lookup table to convert flat note position to note.
         */
        this.indexToFlat = {0: 'A', 1: 'Bb', 2: 'B', 3: 'C', 4: 'Db', 5: 'D'
            , 6: 'Eb', 7: 'E', 8: 'F', 9: 'Gb', 10: 'G', 11: 'Ab'}; 
        
        this.setNote(note);
    }
    
    /**
     * Sets the note from a string. Case insensitive.
     * @param {string} Case insensitive note string such as C, Ab and G#.
     * @throw {InvalidNote} If the note string is invalid.
     */
    setNote(note) {
        var letter = note.charAt(0).toUpperCase();
        var accidental = note.charAt(1).toLowerCase();
        
        note = letter + accidental;
        
        if(this.isValid(note)) {
            this.note = note;
        } else {
            throw "Invalid note.";
        }
    }

    isSharp() {
        return this.note.charAt(1) === '#';
    }
    
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
        return this.notes.hasOwnProperty(note);
    }
    
    /**
     * Returns the flat representation of the note.
     * @return {string} The flat note.
     */
    getFlat() {
        var index = this.notes[this.note]; //get index from lookup table
        
        return this.indexToFlat[index];
    }
    
    /**
     * Returns the sharp representation of the note.
     * @return {string} The sharp note.
     */
    getSharp() {
        var index = this.notes[this.note];
        
        return this.indexToSharp[index];
    }
    
    /**
     * Returns true if the note is natural, ie it has no sharps or flats.
     * @return {boolean} true if no sharps or flats, else false.
     */
    isNatural() {
        return this.note.length === 1;
    }
    
    /**
     * Gets a new Note object at the specified interval.
     * @param {int} halfSteps The amount of half steps. Must be 0 or larger.
     * @return {Note} If the current note is flat, it will return a flat note,
     * else sharp is returned.
     */
    getInterval(halfSteps) {
        var currentIndex = this.notes[this.note];

        var index = (currentIndex + halfSteps) % 12;

        if(this.isFlat()) {
            return new Note(this.indexToFlat[index]);
        } else {
            return new Note(this.indexToSharp[index]);
        }
    }

    toString() {
        return this.note;
    }
}