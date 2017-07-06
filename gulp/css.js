const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const fs = require('fs');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const notify = require("gulp-notify");
const plumber = require('gulp-plumber');
const prefix = require('gulp-autoprefixer');

/**
 * CSS Gulp file.
 * Generates, lints and reports on our CSS.
 */

module.exports = (gulp) => {
  'use strict';

  /**
   * Make SASS into CSS.
   * Saves normal and minified versions
  **/
  gulp.task('sass', ['sass-lint'], () => {
    return gulp.src('./sass/*.scss')
      .pipe(plumber({
          errorHandler: notify.onError({
              title: 'SASS Error',
              message: '<%= error.message %>'
          })
      }))
      .pipe(prefix({
          browsers: ['last 2 versions']
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist'))
      .pipe(cleanCSS({compatibility: 'ie9'}))
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest('./dist'));
  });

  /**
   * SASS Lint
   * Lint everything in Components and
   * @param  {[type]} sass     [description]
   * @param  {[type]} function [description]
   * @return {[type]}          [description]
   */
  gulp.task('sass-lint', function () {
    return gulp.src([
        'sass/**/*.s+(a|c)ss',
        'components/container/**/*.s+(a|c)ss',
        'components/presentation/**/*.s+(a|c)ss',
        '!sass/base/_normalize.scss'
      ])
      .pipe(plumber({
          errorHandler: notify.onError({
              title: 'SASS Error',
              message: '<%= error.message %>'
          })
      }))
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
  });


  /**
   * Builds up the index files for our components so that we can keep our
   * component SCSS files split out into components
  **/
  gulp.task('sass-component-index', () => {
    let sassContentSmall = '';
    let sassContentMedium = '';
    let sassContentLarge = '';

    //Get list of components
    fs.readdir('./components/presentation', (err, items) => {
        for (let i=0; i<items.length; i++) {
          //Ignore directories beginning with _underscore and .DS_Store crud
          if (items[i].indexOf('_') !== 0 && items[i].indexOf('.DS_') !== 0) {
            sassContentSmall += '@import \'../../components/presentation/' + items[i] + '/sass/small\'\;\n';
            sassContentMedium += '@import \'../../components/presentation/' + items[i] + '/sass/medium\'\;\n';
            sassContentLarge += '@import \'../../components/presentation/' + items[i] + '/sass/large\'\;\n';
          }
        }

        fs.writeFile('./sass/components/_small.scss', sassContentSmall);
        fs.writeFile('./sass/components/_medium.scss', sassContentMedium);
        fs.writeFile('./sass/components/_large.scss', sassContentLarge);
    });

  });

};
