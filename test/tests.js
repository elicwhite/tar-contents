'use strict';

var assert = require('assert');
var path = require('path');

var contents = require('../');

describe('getFiles', function() {
  it('should read files', function() {
    var fixturePath = path.join(__dirname, 'fixtures', 'simple.tar.gz');

    return contents.getFiles(fixturePath)
    .then(function(files) {
      assert.equal(files.length, 2);
      assert(files.indexOf('foo.png') !== -1);
      assert(files.indexOf('deeper/bar.png') !== -1);
    });
  });
});