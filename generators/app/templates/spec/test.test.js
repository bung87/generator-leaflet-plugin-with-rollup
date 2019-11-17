const assert = require('assert');
const test = require('../dist/<%= name %>.cjs.js');

describe('test', () => {
  it('has a test', () => {
    assert(false, 'test should have a test');
  });
});