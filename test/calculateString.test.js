const { assert } = require('chai');
const calcStr = require('../js/calculateString');

describe('calculateString', () => {
  it('should return a number', () => {
    assert.isNumber(calcStr('2x4'));
  });
  it('should multiply', () => {
    assert.equal(calcStr('2x4'), 8);
  });
  it('should divide', () => {
    assert.equal(calcStr('2÷4'), .5);
  });
  it('should add', () => {
    assert.equal(calcStr('2+4'), 6);
  });
  it('should subtract', () => {
    assert.equal(calcStr('2-4'), -2);
  });
  it('should support decimals', () => {
    assert.equal(calcStr('.2x4'), .8);
  });
  it('should support *', () => {
    assert.equal(calcStr('2*4'), 8);
  });
  it('should support /', () => {
    assert.equal(calcStr('2/4'), .5);
  });
  it('should support extra spacing', () => {
    assert.equal(calcStr('2      / 4'), .5);
  });
  it('should error with two subsequent operators', () => {
    assert.throws(() => calcStr('2xx4'), 'two subsequent operators');
  });
  it('should properly calculate a long operation', () => {
    assert.equal(calcStr('4÷2+3x4-10÷2+7-2'), 14);
  });
});
