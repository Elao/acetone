'use strict';

var
    // Public
    xtend            = require('xtend'),
    sassGraph        = require('sass-graph'),
    gulp             = require('gulp'),
    gulpSass         = require('gulp-sass'),
    gulpAutoprefixer = require('gulp-autoprefixer'),
    gulpSourcemaps   = require('gulp-sourcemaps'),
    gulpMinifyCss    = require('gulp-minify-css'),
    // Acetone
    AcetonePoolsPlugin = require('../lib/Plugin/PoolsPlugin');

/**
 * Plugin
 */
function Plugin(acetone, id, options)
{
    // Constructor
    AcetonePoolsPlugin.call(this, acetone, id, options);
}

Plugin.prototype = Object.create(AcetonePoolsPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Build sass assets';
};

/**
 * Pipeline
 */
Plugin.prototype._pipeline = function(pool, options, silent)
{
    var
        stream = this._pipelineStream(pool);
    
    // Options
    options = xtend({
        sourcemaps:   false,
        sass:         {},
        autoprefixer: false,
        minify:       false
    }, options);

    // Sourcemaps - Init
    if (options.sourcemaps) {
        options.sourcemaps = (typeof(options.sourcemaps) === 'object') ? options.sourcemaps : {};
        options.sourcemaps.init = (typeof(options.sourcemaps.init) === 'object') ? options.sourcemaps.init : {};
        stream = stream.pipe(
            gulpSourcemaps.init(options.sourcemaps.init)
        );
    }

    // Sass
    stream = stream.pipe(
        gulpSass(xtend({
            outputStyle:  'nested',
            includePaths: this._acetone.libraries.getPaths()
        }, options.sass)
            .on('error', gulpSass.logError)
        )
    );

    // Autoprefixer
    if (options.autoprefixer) {
        options.autoprefixer = (typeof(options.autoprefixer) === 'object') ? options.autoprefixer : {};
        stream = stream.pipe(
            gulpAutoprefixer(options.autoprefixer)
        );
    }

    // Minify
    if (options.minify) {
        options.minify = (typeof(options.minify) === 'object') ? options.minify : {};
        stream = stream.pipe(
            gulpMinifyCss(options.minify)
        );
    }

    return this._pipelineStreamReturn(stream, pool, silent);
};

/**
 * Task watch
 */
Plugin.prototype._taskWatch = function(options)
{
    var
        acetone  = this._acetone,
        pools    = this.pools,
        pipeline = this._pipeline.bind(this);

    return function() {
        var
            map = {};

        pools.forEach(function(pool) {
            pool.forEach(function(flattenPool) {
                Object.keys(
                    sassGraph.parseFile(
                        flattenPool.getSrc(),
                        {
                            loadPaths: acetone.libraries.getPaths()
                        }
                    ).index
                ).forEach(function(file) {
                    if (!map[file]) {
                        map[file] = [flattenPool];
                    } else {
                        map[file].push(flattenPool);
                    }
                });
            });
        }, acetone.options.get('pools'));

        return gulp.watch(Object.keys(map), function(event) {
            if (event.type === 'changed' || event.type === 'deleted') {
                map[event.path].forEach(function(pool) {
                    pipeline(
                        pool,
                        options,
                        acetone.isSilent()
                    );
                });
            }
        });
    };
};

module.exports = function(acetone, id, options)
{
    return new Plugin(acetone, id, options);
};
