'use strict';

var
    // Public
    chalk       = require('chalk'),
    mergeStream = require('merge-stream'),
    gulp        = require('gulp'),
    // Acetone
    TaskPlugin           = require('./TaskPlugin'),
    PluginPoolCollection = require('../Pool/Collection/PluginPoolCollection');

/**
 * Builder plugin
 */
function BuilderPlugin(acetone, alias, options)
{
    // Constructor
    TaskPlugin.call(this, acetone, alias, options);

    // Pools
    this._pools = new PluginPoolCollection(this._acetone, this);

    this._acetone
        .poolsGroup.add(this._pools);

    // Tasks
    this._tasks
        .addTask('build', this._taskBuild, {
            scope:       this,
            description: 'Build'
        })
        .addTask('watch', this._taskWatch, {
            scope:       this,
            description: 'Watch'
        });
}

BuilderPlugin.prototype = Object.create(TaskPlugin.prototype);

/**
 * Get description
 */
BuilderPlugin.prototype.getDescription = function()
{
    return 'Builder plugin';
};

/**
 * Pipeline stream
 */
BuilderPlugin.prototype._pipelineStream = function(pool)
{
    return gulp.src(pool.getSrc());
};

/**
 * Pipeline stream return
 */
BuilderPlugin.prototype._pipelineStreamReturn = function(stream, pool, silent)
{
    return stream.pipe(
        gulp.dest(function(file) {
            if (!silent) {
                this._logPoolFile(pool, file);
            }
            return pool.getDest();
        }.bind(this))
    );
};

/**
 * Pipeline
 */
BuilderPlugin.prototype._pipeline = function(pool, options, silent)
{
    var
        stream = this._pipelineStream(pool);

    return this._pipelineStreamReturn(stream, pool, silent);
};

/**
 * Task build
 */
BuilderPlugin.prototype._taskBuild = function(options)
{
    var
        acetone  = this._acetone,
        pools    = this._pools,
        pipeline = this._pipeline.bind(this);

    return function() {
        var
            stream      = mergeStream(),
            streamEmpty = true;

        pools.forEach(function(pool) {
            streamEmpty = false;
            stream.add(
                pipeline(
                    pool,
                    options,
                    acetone.options.is('silent')
                )
            );
        }, acetone.options.get('pools'));

        return streamEmpty ? null : stream;
    };
};

/**
 * Task watch
 */
BuilderPlugin.prototype._taskWatch = function(options)
{
    var
        acetone  = this._acetone,
        pools    = this._pools,
        pipeline = this._pipeline.bind(this);

    return function() {
        pools.forEach(function(pool) {
            gulp.watch(pool.getSrc(), function() {
                pipeline(
                    pool,
                    options,
                    acetone.options.is('silent')
                );
            });
        }, acetone.options.get('pools'));
    };
};

/**
 * Log pool file
 */
BuilderPlugin.prototype._logPoolFile = function(pool, file)
{
    if (file.isNull()) {
        return;
    }

    console.log(
        this.getAlias(),
        '\'' + chalk.cyan(pool.getId()) + '\'',
        chalk.magenta(this._acetone.fileSystem.getPath(pool.getDest(), file.relative)),
        this._prettyBytes(file.contents.length)
    );
};

/**
 * Pretty bytes
 *
 * See: https://github.com/sindresorhus/pretty-bytes
 */
BuilderPlugin.prototype._prettyBytes = function(num)
{
    if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('Expected a number');
    }

    var exponent;
    var unit;
    var neg = num < 0;
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg) {
        num = -num;
    }

    if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
    }

    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
    unit = units[exponent];

    return (neg ? '-' : '') + num + ' ' + unit;
};

module.exports = BuilderPlugin;
