const assert = require('assert');
const <%= mainClass.toLowerCase() %> = require('../dist/<%= name %>.cjs.js');

describe('<%= mainClass.toLowerCase() %>', () => {
  it('has a test', () => {
    assert(false, '<%= mainClass.toLowerCase() %> should have a test');
  });
});