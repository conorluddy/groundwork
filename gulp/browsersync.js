"use strict";
const browserSync = require('browser-sync').create();
const modRewrite  = require('connect-modrewrite');

/**
 * BrowserSync
 */

module.exports = (gulp, browserSync) => {
    gulp.task('browserSync', () => {
        browserSync.init({
            browser: 'Google Chrome Canary', //Canary will open if it exists, else default should.
            port: 6969,
            reloadDebounce: 2000,
            reloadDelay: 2000,
            server: {
                baseDir: "./dist",
                middleware: [
                    modRewrite(['!\\.\\w+$ /index.html [L]'])
                ]
            }
        });
    });
};
