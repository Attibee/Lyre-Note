var expect  = require("chai").expect;
var Note    = require("../src/Note.js");

describe("Note", function() {
    it("creates all notes", function() {
        var notes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#'];
        
        for(let note of notes) {
            var n = new Note(note);
            
            expect(n.toString()).to.equal(note);
        }
    });
});