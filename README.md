# Acetone

Handle your project's assets with style ! (and gulp)


## Installation

    $ npm install


## Usage

    var
        gulp    = require('gulp'),
        acetone = require('acetone')();

    // Acetone - Layouts
    acetone
        .addLayout('bower')
        .addLayout('npm')
        .addLayout('components')
        .addLayout('assets')
        .addLayout('symfony');

    // Acetone - Plugins
    acetone
        .addPlugin('list')
        .addPlugin('clean')
        .addPlugin('fonts', 'copy', {dir: 'fonts'})
        .addPlugin('images')
        .addPlugin('sass')
        .addPlugin('browserify');

    // Acetone - Pools
    acetone
        .addPoolPattern('toto', {
            'fonts': {src: 'toto/**'}
        });

    // Gulp - Tasks
    gulp.task('list',   acetone.plugins.list.gulpTask);
    gulp.task('clean',  acetone.plugins.clean.gulpTask);

    gulp.task('install', ['fonts', 'images', 'sass', 'js']);
    gulp.task('fonts',  acetone.plugins.fonts.gulpTask);
    gulp.task('images', acetone.plugins.images.gulpTask);
    gulp.task('sass',   acetone.plugins.sass.gulpTask);
    gulp.task('js',     acetone.plugins.browserify.gulpTask);

    gulp.task('watch', ['watch:sass', 'watch:js']);
    gulp.task('watch:sass', acetone.plugins.sass.gulpWatch);
    gulp.task('watch:js',   acetone.plugins.browserify.gulpWatch);

    gulp.task('default', ['install', 'watch']);


## Test

    $ npm test


## Todo

    * Use gulp header plugin when support sourcemaps (see: [https://github.com/tracker1/gulp-header/issues/7])
