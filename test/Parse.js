'use strict';

var chai = require("chai");
var expect = require("chai").expect;
var Parse = require("../src/Parse.js");
var Note = require("../src/Note.js");

/**
 * Adds methods note() and octave() to check the value of Note objects note and
 * octaves.
 */
chai.use(function (_chai, utils) {
    utils.addMethod(_chai.Assertion.prototype, 'note', function(note) {
        this.assert(
            this._obj.getNote() == note
            , "expected note to equal #{exp} but returned #{act}"
            , "expected note to not equal #{exp}"
            , note
            , this._obj.getNote()
        );
    });
    
    utils.addMethod(_chai.Assertion.prototype, 'octave', function(octave) {
        this.assert(
            this._obj.getOctave() == octave
            , "expected octave to equal #{exp} but returned #{act}"
            , "expected octave to not equal #{exp}"
            , octave
            , this._obj.getOctave()
        );
    });
});


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