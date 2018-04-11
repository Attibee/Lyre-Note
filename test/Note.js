'use strict';

var chai = require("chai");
var expect  = chai.expect;
var Note    = require("../src/Note.js");
var InvalidNote = require("../index.js").InvalidNote;

chai.use( require("./utils.js") );

describe("Note", function() {
    describe("set notes", function() {
        it("sets all notes", function() {
            var notes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#'];

            for(let note of notes) {
                var n = new Note(note);

                expect(n.getNote()).to.equal(note);
            }
        });
        
        it("excepts on invalid note", function() {
            expect(function() { new Note('Z'); }).to.throw(InvalidNote);
            expect(function() { new Note(); }).to.throw(InvalidNote);
        });
    });
    
    describe("transposes notes", function() {
        var note = new Note('B', 4);
        
        it("transposes upwards", function(){
            expect(note.getTransposition(2)).to.have.note('C#').and.octave(5);
        });
        
        it("transposes upwards over octaves", function(){
            expect(note.getTransposition(26)).to.have.note('C#').and.octave(7);
        });

        it("transposes downwards", function(){
            expect(note.getTransposition(-2)).to.have.note('A').and.octave(4);
        });
        
        it("transposes downwards over octaves", function(){
            expect(note.getTransposition(-26)).to.have.note('A').and.octave(2);
        });
        
        it("transposes self", function() {
            expect(note.transpose(26)).to.have.note('C#').and.octave(7);
        });
        
        it("transposes without octave", function() {
            expect(new Note('B').getTransposition(26)).to.have.note('C#');
        });
    });
});