/*global it, describe */
'use strict';

var should = require('should');
var aglio = require('../');
var gutil = require('gulp-util');
var fs = require('fs');
var pj = require('path').join;

function createVinyl(fixtureFileName, contents) {
  var base = pj(__dirname, 'fixtures');
  var filePath = pj(base, fixtureFileName);

  return new gutil.File({
    cwd: __dirname,
    base: base,
    path: filePath,
    contents: contents || fs.readFileSync(filePath)
  });
}

describe('gulp-aglio', function () {
  describe('aglio()', function () {
    it('should pass file when it isNull()', function (done) {
      var stream = aglio();
      var emptyFile = {
        isNull: function () { return true; }
      };
      stream.on('data', function (data) {
        data.should.equal(emptyFile);
        done();
      });
      stream.write(emptyFile);
    });

    it('should emit error when file isStream()', function (done) {
      var stream = aglio();
      var streamFile = {
        isNull: function () { return false; },
        isStream: function () { return true; }
      };
      stream.on('error', function (err) {
        err.message.should.equal('Streaming not supported');
        done();
      });
      stream.write(streamFile);
    });

    it('should compile with default theme', function (done) {
      var input = createVinyl('sample.md');

      var stream = aglio({ template: 'default' });
      stream.on('data', function (srcFile) {
        should.exist(srcFile);
        should.exist(srcFile.path);
        should.exist(srcFile.relative);
        should.exist(srcFile.contents);
        srcFile.path.should.equal(pj(__dirname, 'fixtures', 'sample.html'));
        fs.writeFileSync(pj(__dirname, 'fixtures', 'output.html'), srcFile.contents);
        var compiled = String(srcFile.contents).replace(/[\s]/gi, '');
        compiled.should.containEql(
          fs.readFileSync(pj(__dirname, 'expect/sample-default.html'), 'utf8')
            .replace(/[\s]/gi, '')
        );
        done();
      });
      stream.write(input);
    });
    it('should inline includes', function (done) {
      var input = createVinyl('includes/root.md');

      var stream = aglio({
        template: 'default'
      });
      stream.on('data', function (srcFile) {
        should.exist(srcFile);
        should.exist(srcFile.path);
        should.exist(srcFile.relative);
        should.exist(srcFile.contents);
        srcFile.path.should.equal(pj(__dirname, 'fixtures', 'includes', 'root.html'));
        fs.writeFileSync(pj(__dirname, 'fixtures', 'includes', 'output.html'), srcFile.contents);
        var compiled = String(srcFile.contents).replace(/[\s]/gi, '');
        compiled.should.containEql(
          fs.readFileSync(pj(__dirname, 'expect/sample-includes.html'), 'utf8')
            .replace(/[\s]/gi, '')
        );
        done();
      });
      stream.write(input);
    });
  });
});
