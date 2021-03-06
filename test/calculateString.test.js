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
    assert.equal(calcStr('2÷4'), 0.5);
  });
  it('should add', () => {
    assert.equal(calcStr('2+4'), 6);
  });
  it('should subtract', () => {
    assert.equal(calcStr('2-4'), -2);
  });
  it('should support multiple digits', () => {
    assert.equal(calcStr('100 - 70'), 30);
  });
  it('should support decimals', () => {
    assert.equal(calcStr('.2x4'), 0.8);
  });
  it('should support *', () => {
    assert.equal(calcStr('2*4'), 8);
  });
  it('should support /', () => {
    assert.equal(calcStr('2/4'), 0.5);
  });
  it('should support extra spacing', () => {
    assert.equal(calcStr('2      / 4'), 0.5);
  });
  it('should support extra spacing with decimals', () => {
    assert.equal(calcStr('2      /  .  4'), 5);
  });
  it('should support negative numbers', () => {
    assert.equal(calcStr('2*-4'), -8);
  });
  it('should support subtracting negative numbers', () => {
    assert.equal(calcStr('2 - -4'), 6);
  });
  it('should error with two negative signs after an operator', () => {
    assert.throws(() => calcStr('2*--4'), 'two subsequent operators');
  });
  it('should error with two subsequent operators', () => {
    assert.throws(() => calcStr('2xx4'), 'two subsequent operators');
  });
  it('should error when starting with an (non-minus) operator', () => {
    assert.throws(() => calcStr('x42'), 'expression begins with operator');
  });
  it('should error when starting with two minus operators', () => {
    assert.throws(() => calcStr('--42'), 'expression begins with operator');
  });
  it('should not error when starting with a negative number', () => {
    assert.equal(calcStr('-1x42'), -42);
  });
  it('should properly handle division by 0', () => {
    assert.isNaN(calcStr('0/0'));
    assert.equal(calcStr('1/0'), Infinity);
  });
  it('should properly calculate a long operation', () => {
    assert.equal(calcStr('4÷2+3x4-10÷2+7-2'), 14);
  });
});
