"use strict";
let sass = require('gulp-sass');
let fs = require('fs');

/**
 * CSS Gulp file.
 * Generates, lints and reports on our CSS.
 */

module.exports = (gulp) => {

  gulp.task('sass', () => {
    return gulp.src('./sass/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('sass-build-component-index', () => {
    let sassContentSmall = '';
    let sassContentMedium = '';
    let sassContentLarge = '';

    //Get list of components
    fs.readdir('./components', function(err, items) {
        // console.log(items);
        for (let i=0; i<items.length; i++) {
          //Ignore directories beginning with _underscore
          if (items[i].indexOf('_') !== 0) {
            sassContentSmall += '@import \"../../components/' + items[i] + '/sass/_small.scss\"\;\n';
            sassContentMedium += '@import \"../../components/' + items[i] + '/sass/_medium.scss\"\;\n';
            sassContentLarge += '@import \"../../components/' + items[i] + '/sass/_large.scss\"\;\n';
          }
        }

        fs.writeFile('./sass/components/_small.scss', sassContentSmall);
        fs.writeFile('./sass/components/_medium.scss', sassContentMedium);
        fs.writeFile('./sass/components/_large.scss', sassContentLarge);
    });

  })

};
