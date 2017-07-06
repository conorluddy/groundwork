"use strict";

module.exports = (gulp) => {

  gulp.task('help', ()=> {
    let tasks = gulp.tasks;

    console.log('Gulp tasks: ');
    console.log('sass');
    console.log('sass-build-component-index');
    console.log('component');
    console.log('help');
    console.log('default');

  });

};
