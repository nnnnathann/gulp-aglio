gulp-aglio
=========

[![Build Status](https://travis-ci.org/nnnnathann/gulp-aglio.png?branch=master)](https://travis-ci.org/nnnnathann/gulp-aglio)

[![Dependency Status](http://img.shields.io/david/nnnnathann/gulp-aglio.svg?style=flat)](https://david-dm.org/nnnnathann/gulp-aglio)

Port of [aglio](https://github.com/danielgtaylor/aglio) to gulp.

Renders standard HTML documentation for
REST APIs through the gulp build system.

## Install

**Requires node v0.10.x due to protaganist and streams2 dependencies.**

```
npm install gulp-aglio
```

### Usage
````javascript
var aglio = require('gulp-aglio');
gulp.task('docs', function () {
  gulp.src('_docs/*.md')
    .pipe(aglio({ template: 'default' }))
    .pipe(gulp.dest('docs'));
});
````

## Options

The same options found in the node api for aglio [here](https://github.com/danielgtaylor/aglio#agliorender-blueprint-options-callback)
can be called with this plugin.

## License

(MIT License)

Copyright (c) 2014 Nathan Bleigh nathan.bleigh@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
