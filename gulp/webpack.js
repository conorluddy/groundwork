"use strict";
const webpack = require('webpack');
const gutil = require('gutil');

/**
 * Webpack bundling
 */

module.exports = (gulp) => {

  gulp.task('webpack', ['es-lint'], (callback) => {

    webpack({
        entry: [
          'whatwg-fetch',
          './index.jsx'
        ],
        output: {
            filename: './dist/bundle.js'
        },
        // externals: {
        //   'react': 'React',
        //   'react-dom': 'ReactDOM'
        // },
        module: {
            loaders: [{
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            }]
        }//,
        // plugins:[
        //   //https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
        //   new webpack.DefinePlugin({
        //     'process.env': {
        //       NODE_ENV: JSON.stringify('production')
        //     }
        //   }),
        //   new webpack.optimize.UglifyJsPlugin()
        // ]
    }, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });

  });


  gulp.task('webpack-production', ['es-lint'], (callback) => {

    webpack({
        entry: [
          'whatwg-fetch',
          './index.jsx'
        ],
        output: {
            filename: './dist/bundle.js'
        },
        // externals: {
        //   'react': 'React',
        //   'react-dom': 'ReactDOM'
        // },
        module: {
            loaders: [{
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            }]
        },
        plugins:[
          //https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new webpack.optimize.UglifyJsPlugin()
        ]
    }, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });

  });

};
