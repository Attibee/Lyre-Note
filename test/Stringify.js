'use strict';

var expect = require("chai").expect;
var Note = require("../index.js");
var Stringify = Note.Stringify;
var Parse = Note.Parse;

describe("Stringify", function() {
    describe("stringifies helmholtz", function() {
        it("stringifies all octaves", function() {
            expect( Stringify( new Note('C', 0), Stringify.HELMHOLTZ ) ).to.equal("C,,");
            expect( Stringify( new Note('C', 1), Stringify.HELMHOLTZ ) ).to.equal("C,");
            expect( Stringify( new Note('C', 2), Stringify.HELMHOLTZ ) ).to.equal("C");
            expect( Stringify( new Note('C', 3), Stringify.HELMHOLTZ ) ).to.equal("c");
            expect( Stringify( new Note('C', 4), Stringify.HELMHOLTZ ) ).to.equal("c'");
            expect( Stringify( new Note('C', 5), Stringify.HELMHOLTZ ) ).to.equal("c''");
        });
    });
    
    describe("stringifies scientific", function() {
        it("stringifies basic notes", function() {
            expect( Stringify( new Note('C', 0) ) ).to.equal("C0");
            expect( Stringify( new Note('C', 1) ) ).to.equal("C1");
        });
        
        it("stringify scientific without octave", function() { 
            expect(Stringify(new Note("C"))).to.equal("C");
        });
    });
});