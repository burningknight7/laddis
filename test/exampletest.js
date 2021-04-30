const { italic } = require('ansi-colors');
var assert = require('assert')

describe('Array' , () => {
    describe('#indexOf' , () => {
        it('should return -1 when not found', () => {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        });
    });
});