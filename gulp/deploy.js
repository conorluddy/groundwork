"use strict";

/**
 * Deployment
 */

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const bump = require('gulp-bump');
const replace = require('gulp-replace');

module.exports = (gulp) => {

  gulp.task('deploy', () => {});

  gulp.task('pre-deploy', ['bump', 'content', 'sass-component-index'], () => {
      // gulp.start('assets');
      gulp.start('sass');
      gulp.start('webpack-production');
      gulp.src('./index.html')
        .pipe(replace('/styles.css', '/styles.min.css'))
          .pipe(gulp.dest('dist/'));

  });

  gulp.task('bump', function(){
    gulp.src('./package.json')
          .pipe(bump({type:'minor'}))
            .pipe(gulp.dest('./'));
  });

};
