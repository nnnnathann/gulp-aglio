var aglio = require('aglio');
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var defaults = require('lodash.defaults');
var path = require('path');
var clc = require('cli-color');

module.exports = function (options) {
  'use strict';
  // Mixes in default options.
  options = defaults(options || {}, {
    compress: false,
    paths: []
  });

  var cErr, cWarn, getLineNo, logWarnings;
  cErr = clc.white.bgRed;
  cWarn = clc.xterm(214).bgXterm(235);

  getLineNo = function(input, err) {
    if (err.location && err.location.length) {
      return input.substr(0, err.location[0].index).split('\n').length;
    }
  };

  logWarnings = function(warnings) {
    var i, len, lineNo, ref, warning;
    ref = warnings || [];
    for (i = 0, len = ref.length; i < len; i++) {
      warning = ref[i];
      lineNo = getLineNo(warnings.input, warning) || 0;
      console.error(cWarn('[aglio] line ' + lineNo + ':') + (' ' + warning.message +  ' (warning code ' + warning.code + ')'));
    }
};

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

    // Inject includePath for relative includes
    opts.includePath = opts.includePath || path.dirname(opts.filename);

    aglio.render(str, opts, function (err, html, warnings) {
      if (err) {
        self.emit('error', new PluginError('gulp-aglio', err));
      } else {
        logWarnings(warnings);
        file.contents = new Buffer(html);
        file.path = gutil.replaceExtension(file.path, '.html');
        self.push(file);
      }
      next();
    });
  }

  return through2.obj(transform);
};
