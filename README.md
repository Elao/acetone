# Acetone [![Build Status](https://travis-ci.org/Elao/acetone.svg?branch=master)](https://travis-ci.org/Elao/acetone)

> Wear gloves!

Acetone is *not* a nth task based build tool ! It's a set of classes, exposed by a fluent api, allowing to structure your assets in an elegant manner, and offering a bridge to gulp tasks.


## Blocking :(

* Gulp 4
  https://github.com/gulpjs/gulp/tree/4.0
* Sourcemap support in gulp-header
  https://github.com/tracker1/gulp-header/issues/7
* Can't use symbolic link in gulp-imagin dependencies
  https://github.com/imagemin/gifsicle-bin/pull/48
  https://github.com/imagemin/jpegtran-bin/pull/57
  https://github.com/imagemin/optipng-bin
* Can't use require() with watchify
  https://github.com/substack/watchify/issues/74
* isEmpty support in merge-stream
  https://github.com/grncdr/merge-stream/pull/15

## No more blocking :)

* Can't import files with dot in sass-graph
  https://github.com/xzyfer/sass-graph/pull/24

## Todo

* Fix tests
* Refactor AcetoneIntrospector
* Handle watchify --ignore-watch (to vendor libraries such as npm_modules or bower_components)
* Same with sass

## Concepts

### Source

### Library

### Pool

## Api

## Plugins

## Installation

    $ npm install

## Usage

    var
        gulp    = require('gulp'),
        acetone = require('acetone')();

    // Acetone - Layouts
    acetone.plugin('layouts/assets');
    acetone.plugin('layouts/symfony');
    acetone.plugin('layouts/components');
    acetone.plugin('layouts/npm');
    acetone.plugin('layouts/bower');

    // Acetone - Tasks
    acetone.plugin('info',  'tasks/info');
    acetone.plugin('clean', 'tasks/clean');

    // Acetone - Builders
    acetone.plugin('fonts',     'builders/copy');
    acetone.plugin('images',    'builders/images');
    acetone.plugin('sass',      'builders/sass');

    // Acetone - Pools
    
    acetone.pools('sass')
        .addSourcePool({src: 'sass/**/[!_]*.scss', dest: 'css'});
    
    acetone.pools('templates')
        .addSourcePool({src: 'index.html.mustache'});
    
    acetone.pools('fonts')
        .addSourcePool({src:  'fonts/**/*.*', dest: 'fonts'})
        .addLibraryPool({src: 'font-awesome/fonts/*.*', dest: 'fonts/font-awesome'});
    
    acetone.pools('images')
        .addSourcePool({src:  'images/**/*.*', dest: 'images'});

    // Gulp - Tasks
    gulp.task('info', acetone.tasks('info').all());
    gulp.task('clean', acetone.tasks('clean').clean());

    gulp.task('build', ['fonts', 'images', 'sass']);
    gulp.task('fonts', acetone.tasks('fonts').build());
    gulp.task('images', acetone.tasks('images').build());
    gulp.task('sass', acetone.tasks('sass').build({
        sourcemaps: acetone.options.is('dev'),
        minify:     !acetone.options.is('dev')
    }));

    gulp.task('watch', ['watch:sass']);
    gulp.task('watch:sass', acetone.tasks('sass').watch({
        sourcemaps: true
    }));

    gulp.task('default', ['install', 'watch']);


## Test

    $ npm test
