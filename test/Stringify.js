'use strict';

var expect = require("chai").expect;
var Note = require("../index.js");
var Stringify = Note.Stringify;
var Parse = Note.Parse;

describe("Stringify", function() {
    describe("stringifies helmholtz", function() {
        it("stringifies all octaves", function() {
            expect( Stringify( new Note('C', 0), Stringify.Helmholtz ) ).to.equal("C,,");
            expect( Stringify( new Note('C', 1), Stringify.Helmholtz ) ).to.equal("C,");
            expect( Stringify( new Note('C', 2), Stringify.Helmholtz ) ).to.equal("C");
            expect( Stringify( new Note('C', 3), Stringify.Helmholtz ) ).to.equal("c");
            expect( Stringify( new Note('C', 4), Stringify.Helmholtz ) ).to.equal("c'");
            expect( Stringify( new Note('C', 5), Stringify.Helmholtz ) ).to.equal("c''");
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