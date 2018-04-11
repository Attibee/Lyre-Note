'use strict';

var expect  = require("chai").expect;
var Note    = require("../src/Note.js");
var InvalidNote = require("../index.js").InvalidNote;

describe("Note", function() {
    /*describe("set notes", function() {
        it("creates all notes", function() {
            var notes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#'];

            for(let note of notes) {
                var n = new Note(note);

                expect(n.toString()).to.equal(note);
            }
        });
        
        it("excepts on invalid note", function() {
            expect(function() { new Note('Z') }).to.throw(InvalidNote);
            expect(function() { new Note() }).to.throw(InvalidNote);
        });
    });
    
    describe("transposes notes", function() {
        var note = new Note('A');
        
        it("transposes upwards", function(){
            expect(note.getTransposition(2).toString()).to.equal('B');
        });
        
        it("transposes upwards over octaves", function(){
            expect(note.getTransposition(26).toString()).to.equal('B');
        });
        
        it("transposes downwards", function(){
            expect(note.getTransposition(-2).toString()).to.equal('G');
        });
        
        it("transposes downwards over octaves", function(){
            expect(note.getTransposition(-26).toString()).to.equal('G');
        });
        
        it("transposes self", function() {
            expect(note.transpose(26).toString()).to.equal('B');
        });
    });*/
});