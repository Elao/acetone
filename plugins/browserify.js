'use strict';

var
    // Core
    _path = require('path'),
    // Public
    xtend          = require('xtend'),
    mergeStream    = require('merge-stream'),
    commentsParser = require('comment-parser'),
    browserify     = require('browserify'),
    watchify       = require('watchify'),
    source         = require('vinyl-source-stream'),
    buffer         = require('vinyl-buffer'),
    gulpSourcemaps = require('gulp-sourcemaps'),
    gulpUglify     = require('gulp-uglify'),
    gulpRename     = require('gulp-rename'),
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
    return 'Build js assets with browserify';
};

/**
 * Pipeline
 */
Plugin.prototype._pipeline = function(pool, watch, options, silent)
{
    var
        acetone              = this._acetone,
        pipelineStreamReturn = this._pipelineStreamReturn.bind(this),
        bundler;

    // Options
    options = xtend({
        sourcemaps: false,
        browserify: {},
        minify:     false,
        rename:     false
    }, options);

    // Bundler
    function bundle() {
        var
            comments,
            bundleRequire  = [],
            bundleExternal = [],
            stream;

        // Parse comments
        comments = commentsParser(
            acetone.fileSystem.readFile(pool.getSrc())
        );

        // Parse bundle options from comments
        comments.forEach(function(comment) {
            comment.tags.forEach(function(tag) {
                if (tag.name) {
                    switch(tag.tag) {
                        case 'require':
                            if (tag.description) {
                                bundleRequire.push({
                                    file: tag.name,
                                    expose: tag.description
                                });
                            } else {
                                bundleRequire.push(tag.name);
                            }
                            break;
                        case 'external':
                            bundleExternal.push(tag.name);
                            break;
                    }
                }
            });
        });

        // Stream
        stream = bundler
            .require(bundleRequire)
            .external(bundleExternal)
            .bundle()
                .pipe(source(_path.basename(pool.getSrc())))
                .pipe(buffer());

        // Sourcemaps - Init
        if (options.sourcemaps) {
            options.sourcemaps = (typeof(options.sourcemaps) === 'object') ? options.sourcemaps : {};
            options.sourcemaps.init = (typeof(options.sourcemaps.init) === 'object') ? options.sourcemaps.init : {};
            stream = stream.pipe(
                gulpSourcemaps.init(options.sourcemaps.init)
            );
        }

        // Minify
        if (options.minify) {
            options.minify = (typeof(options.minify) === 'object') ? options.minify : {};
            stream = stream.pipe(
                gulpUglify(options.minify)
            );
        }

        // Rename
        if (options.rename) {
            stream = stream.pipe(
                gulpRename(options.rename)
            );
        }

        // Sourcemap - Write
        if (options.sourcemaps) {
            options.sourcemaps.write = (typeof(options.sourcemaps.write) === 'object') ? options.sourcemaps.write : {};
            stream = stream.pipe(
                gulpSourcemaps.write(options.sourcemaps.write)
            );
        }

        return pipelineStreamReturn(stream, pool, silent);
    }

    if (watch || false) {
        bundler = watchify(
            browserify(pool.getRealSrc(), xtend(
                watchify.args,
                xtend({
                    paths: acetone.libraries.getPaths()
                }, options.browserify)
            ))
        );

        bundler.on('update', bundle);

        return bundler.bundle();
    } else {
        bundler = browserify(pool.getRealSrc(), xtend({
            paths: acetone.libraries.getPaths()
        }, options.browserify));

        return bundle();
    }
};

/**
 * Task build
 */
Plugin.prototype._taskBuild = function(options)
{
    var
        acetone  = this._acetone,
        pools    = this.pools,
        pipeline = this._pipeline.bind(this);

    return function() {
        var
            stream      = mergeStream(),
            streamEmpty = true;

        pools.forEach(function(pool) {
            pool.forEach(function(flattenPool) {
                streamEmpty = false;
                stream.add(
                    pipeline(
                        flattenPool,
                        false,
                        options,
                        acetone.options.is('silent')
                    )
                );
            });
        }, acetone.options.get('pools'));

        return streamEmpty ? null : stream;
    };
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
            stream      = mergeStream(),
            streamEmpty = true;

        pools.forEach(function(pool) {
            pool.forEach(function(flattenPool) {
                streamEmpty = false;
                stream.add(
                    pipeline(
                        flattenPool,
                        true,
                        options,
                        acetone.options.is('silent')
                    )
                );
            });
        }, acetone.options.get('pools'));

        return streamEmpty ? null : stream;
    };
};

module.exports = function(acetone, id, options)
{
    return new Plugin(acetone, id, options);
};
