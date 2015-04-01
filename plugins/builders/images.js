'use strict';

var
    // Public
    xtend        = require('xtend'),
    gulpChanged  = require('gulp-changed'),
    gulpImagemin = require('gulp-imagemin'),
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
    return 'Copy and minify images';
};

/**
 * Pipeline
 */
Plugin.prototype._pipeline = function(pool, options, silent)
{
    var
        stream = this._pipelineStream(pool);

    options = xtend({
        changed: false,
        minify:  {}
    }, options);

    // Changed
    if (options.changed) {
        stream = stream.pipe(
            gulpChanged(pool.getDest())
        );
    }

    // Minify
    stream = stream.pipe(
        gulpImagemin(options.minify)
    );

    return this._pipelineStreamReturn(stream, pool, silent);
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
