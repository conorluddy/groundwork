"use strict";
let fs = require('fs');

/**
 * Images Gulp file.
 * Optimise and otherwise fuck around with images
 */

module.exports = (gulp) => {

  gulp.task('fonts', () => {
    return gulp.src('./assets/fonts/**/*')
      .pipe(gulp.dest('./dist/assets/fonts'));
  });


};
