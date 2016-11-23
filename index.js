'use strict';

var Bluebird = require('bluebird');
var uuid = require('uuid');
var path = require('path');
var fs = Bluebird.promisifyAll(require('fs-extra'));
var tar = require('tar-fs');
var dir = require('node-dir');

function readFiles(path, options) {
  return new Bluebird(function(resolve, reject) {
    dir.readFiles(path, options, function(err, content, next) {
      next();
    }, function(err, files) {
      if (err) {
        reject(err);
        return;
      }

      resolve(files);
    });
  });
}

var funcs = {
  getFiles: function(fileName) {
    var guid = uuid.v4();
    var tmp = path.join(__dirname, '/tmp');
    var folder = path.join(tmp, guid);

    return fs.ensureDirAsync(folder)
    .then(function() {
      return new Bluebird(function(resolve, reject) {
        var readStream = fs.createReadStream(fileName);

        var extract = tar.extract(folder);

        extract.on('error', function(err) {
          reject(err);
        });

        extract.on('finish', function() {
          resolve();
        });

        readStream.pipe(extract);
      });
    })
    .then(function() {
      return readFiles(folder);
    })
    .then(function(files) {
      return fs.removeAsync(tmp)
      .then(function() {
        return files.map(function(file) {
          return path.relative(folder, file);
        });
      });
    });
  }
};

module.exports = funcs;