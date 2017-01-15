"use strict";
let gulp = require('gulp');
let webpack = require('webpack-stream');
let browserSync = require('browser-sync').create();

require('./gulp_modules/css.js')(gulp);
require('./gulp_modules/generate.js')(gulp);
require('./gulp_modules/documentation.js')(gulp);
require('./gulp_modules/js.js')(gulp);

/**
 * Default: Webpack, BrowserSync, Watch
 */
gulp.task('default', () => {
  gulp.src('./index.js')
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
          }
        ],
      },
    }))
    .pipe(gulp.dest('dist/'));


  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });

  gulp.watch(['./index.js', './dist/*'], () => {
    browserSync.reload();
  });

  gulp.watch(['sass/**/*','components/**/*.scss'], () => {
    gulp.start('sass');
  });

});
