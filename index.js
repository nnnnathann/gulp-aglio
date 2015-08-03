var aglio = require('aglio');
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var defaults = require('lodash.defaults');

module.exports = function (options) {
  'use strict';
  // Mixes in default options.
  options = defaults(options || {}, {
    compress: false,
    paths: []
  });

  function transform(file, enc, next) {
    var self = this;

    if (file.isNull()) {
      self.push(file); // pass along
      return next();
    }

    if (file.isStream()) {
      self.emit('error', new PluginError('gulp-aglio', 'Streaming not supported'));
      return next();
    }

    var str = file.contents.toString('utf8');

    // Clones the options object.
    var opts = defaults({
      theme: 'default'
    }, options);

    // Injects the path of the current file.
    opts.filename = file.path;

    aglio.render(str, opts, function (err, html, warnings) {
      if (err) {
        self.emit('error', new PluginError('gulp-aglio', err));
      } else {
        if (warnings) {
          outputWarning(warnings, file.path, str);
        }
        file.contents = new Buffer(html);
        file.path = gutil.replaceExtension(file.path, '.html');
        self.push(file);
      }
      next();
    });
  }
  function outputWarning(warnings, path, contents) {
    function getLine(index) {
      var line = 1;
      for (var i = 0; i < index; ++i) {
        i = contents.indexOf('\n', i);
        if (i < 0) {
          break;
        }
        line += 1;
      }
      return line;
    }
    warnings.forEach(function (warn) {
      if (warn.location) {
        warn.location.forEach(function (loc) {
          gutil.log(gutil.colors.cyan(path), 'Line:' , gutil.colors.magenta(getLine(loc.index)), warn.message);
        });
      }
    });
  }

  return through2.obj(transform);
};
