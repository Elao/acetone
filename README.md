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

    /* ****** */
    /* Layout */
    /* ****** */

    acetone
        .layout('symfony')
        .layout('components')
        .layout('npm');

    /* ******* */
    /* Plugins */
    /* ******* */

    acetone.plugin('info');
    acetone.plugin('clean');
    acetone.plugin('sass')
        .pools
            .addSourcePool({src: 'sass/**/[!_]*.scss', dest: 'css'})
            .addLibraryPool({src: 'aaa/**/[!_]*.scss', dest: 'css/popo'})
            .addPool({src: 'lib/ccc/**/[!_]*.scss', dest: 'css/pupu'});
    acetone.plugin('fonts', 'copy')
        .pools
            .addSourcePool({src: 'fonts/**/*.*', dest: 'fonts'});
    acetone.plugin('images')
        .pools
            .addSourcePool({src: 'images/**/*.*', dest: 'images'});

    /* **** */
    /* Gulp */
    /* **** */

    gulp.task('default', ['build', 'watch']);

    gulp.task('build', ['sass', 'fonts', 'images']);
    gulp.task('watch', ['watch:sass']);

    gulp.task('info',  acetone.tasks('info').all());
    gulp.task('clean', acetone.tasks('clean').clean());

    // Sass
    gulp.task('sass', acetone.tasks('sass').build({
        sourcemaps:   acetone.options.is('dev'),
        minify:       !acetone.options.is('dev'),
        autoprefixer: true
    }));
    gulp.task('watch:sass', acetone.tasks('sass').watch({
        sourcemaps: true,
        autoprefixer: true
    }));

    // Fonts
    gulp.task('fonts', acetone.tasks('fonts').build());

    // Images
    gulp.task('images', acetone.tasks('images').build());


## Test

    $ npm test
