module.exports = function (_chai, utils) {
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
};
