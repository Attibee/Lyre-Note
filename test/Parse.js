'use strict';

var chai = require("chai");
var expect = require("chai").expect;
var Note = require("../index.js");
var Parse = Note.Parse;

chai.use( require("./utils.js") );

describe("Parse", function() {
    describe("parses scientific notes", function() {
        it("parses with octave", function() {
            expect(Parse("C4", Parse.SCIENTIFIC)).to.have.note("C").and.octave(4);
        });
        
        it("parses without octave", function() {
            expect(Parse("C", Parse.SCIENTIFIC)).to.have.note("C").and.octave(null);
        });
        
        it("throws on invalid note", function() {
            expect(function() { Parse("Z", Parse.SCIENTIFIC); }).to.throw();
        });
    });
    
    describe("parses helmholtz notes", function() {
        it("parses across all octaves", function() {
            expect(Parse("Ab,,", Parse.HELMHOLTZ)).to.have.note("Ab").and.octave(0);
            expect(Parse("Ab,", Parse.HELMHOLTZ)).to.have.note("Ab").and.octave(1);
            expect(Parse("Ab", Parse.HELMHOLTZ)).to.have.note("Ab").and.octave(2);
            expect(Parse("ab", Parse.HELMHOLTZ)).to.have.note("Ab").and.octave(3);
            expect(Parse("ab'", Parse.HELMHOLTZ)).to.have.note("Ab").and.octave(4);
            expect(Parse("ab''", Parse.HELMHOLTZ)).to.have.note("Ab").and.octave(5);
        });
        
        it("throws on wrong capitalization and prime mark", function() {
            expect(function() { Parse("a,", Parse.HELMHOLTZ) }).to.throw();
            expect(function() { Parse("A'", Parse.HELMHOLTZ) }).to.throw();
        });
    });
});