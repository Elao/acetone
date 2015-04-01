'use strict';

var
    // Public
    xtend          = require('xtend'),
    gulpChanged    = require('gulp-changed'),
    gulpMinifyHtml = require('gulp-minify-html'),
    // Acetone
    BuilderPlugin = require('../../lib/Plugin/BuilderPlugin');

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    // Constructor
    BuilderPlugin.call(this, acetone, alias, options);
}

Plugin.prototype = Object.create(BuilderPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Copy assets';
};

/**
 * Pipeline
 */
Plugin.prototype._pipeline = function(pool, options, silent)
{
    var
        stream = this._pipelineStream(pool);

    options = xtend({
        changed:    false,
        minifyHtml: false
    }, options);

    // Changed
    if (options.changed) {
        stream = stream.pipe(
            gulpChanged(pool.getDest())
        );
    }

    // Minify - Html
    if (options.minifyHtml) {
        options.minifyHtml = (typeof(options.minifyHtml) === 'object') ? options.minifyHtml : {};
        stream = stream.pipe(
            gulpMinifyHtml(options.minifyHtml)
        );
    }

    return this._pipelineStreamReturn(stream, pool, silent);
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
