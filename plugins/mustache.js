'use strict';

var
    // Public
    xtend          = require('xtend'),
    gulpChanged    = require('gulp-changed'),
    gulpMustache   = require('gulp-mustache'),
    gulpRename     = require('gulp-rename'),
    gulpMinifyHtml = require('gulp-minify-html'),
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
    return 'Build mustache templates';
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
        changed:    false,
        mustache:   [],
        minifyHtml: false
    }, options);

    // Changed
    if (options.changed) {
        stream = stream.pipe(
            gulpChanged(pool.getDest())
        );
    }

    // Mustache
    stream = stream.pipe(
        gulpMustache(
            options.mustache[0],
            options.mustache[1],
            options.mustache[2]
        )
    );

    // Rename
    stream = stream.pipe(
        gulpRename(function (path) {
            // Remove .mustache extension
            if (path.extname === '.mustache') {
                path.extname = '';
            }
        })
    );

    // Minify - Html
    if (options.minifyHtml) {
        options.minifyHtml = (typeof(options.minifyHtml) === 'object') ? options.minifyHtml : {};
        stream = stream.pipe(
            gulpMinifyHtml(options.minifyHtml)
        );
    }

    return this._pipelineStreamReturn(stream, pool, silent);
};

module.exports = function(acetone, id, options)
{
    return new Plugin(acetone, id, options);
};
