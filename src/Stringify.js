'use strict';

function scientificStringify(note) {
    return note.getNote() + note.getOctave();
}

function helmholtzStringify(note) {
    var octave = note.getOctave();
    
    //set note
    if(octave >= 3) {
        var note = note.getNote().toLowerCase();
        var suffix = "\'".repeat(octave - 3);
    } else {
        var note = note.getNote().toUpperCase();
        var suffix = ",".repeat(Math.abs(2 - octave));
    }
    
    return note + suffix;
}

function Stringify(note, type = Stringify.SCIENTIFIC) {
    if(typeof type === "number") {
        if(type === Stringify.SCIENTIFIC) {
            return scientificStringify(note);
        } else if(type === Stringify.HELMHOLTZ) {
            return helmholtzStringify(note);
        } else {
            throw type + " is an invalid stringify type flag.";
        }
    } else if(typeof type === "object") {
        return type(note);
    } else {
        throw "Invalid type parameter " + typeof type;
    }
}

Stringify.SCIENTIFIC = 0;
Stringify.HELMHOLTZ = 1;

module.exports = Stringify;