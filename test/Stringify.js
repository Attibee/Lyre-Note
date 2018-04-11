'use strict';

var expect = require("chai").expect;
var Stringify = require("../src/Stringify.js");
var Note = require("../src/Note.js");

describe("Stringify", function() {
   /* describe("stringifies notes", function() {
        var map = {
            "C0": "C,,",
            "C1": "C,",
            "C2": "C",
            "C3": "c",
            "C4": "c'",
            "C5": "c''"
        };
        
        it("stringifies all notes to helmholtz", function() {
            for(let scientific in map) {
                var helmholtz = map[scientific];
                var string = Stringify(new Note(scientific), Stringify.HELMHOLTZ);

                expect(string).to.equal(helmholtz);
            }
        });
        
        it("stringifies all notes to scientific", function() {
            for(let scientific in map) {
                var string = Stringify(new Note(scientific), Stringify.SCIENTIFIC);

                expect(string).to.equal(scientific);
            }
        });
    });*/
});