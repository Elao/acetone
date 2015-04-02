'use strict';

var
    // Public
    xtend        = require('xtend'),
    gulpChanged  = require('gulp-changed'),
    gulpImagemin = require('gulp-imagemin'),
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

module.exports = function(acetone, id, options)
{
    return new Plugin(acetone, id, options);
};
