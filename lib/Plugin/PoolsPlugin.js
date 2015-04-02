'use strict';

var
    // Public
    chalk       = require('chalk'),
    mergeStream = require('merge-stream'),
    gulp        = require('gulp'),
    // Acetone
    TasksPlugin          = require('./TasksPlugin'),
    PluginPoolCollection = require('../Pool/Collection/PluginPoolCollection');

/**
 * Pools plugin
 */
function PoolsPlugin(acetone, id, options)
{
    // Constructor
    TasksPlugin.call(this, acetone, id, options);

    // Pools
    this.pools = new PluginPoolCollection(this._acetone, this);

    this._acetone
        .poolsGroup.add(this.pools);

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

PoolsPlugin.prototype = Object.create(TasksPlugin.prototype);

/**
 * Get description
 */
PoolsPlugin.prototype.getDescription = function()
{
    return 'Pools plugin';
};

/**
 * Pipeline stream
 */
PoolsPlugin.prototype._pipelineStream = function(pool)
{
    return gulp.src(pool.getSrc());
};

/**
 * Pipeline stream return
 */
PoolsPlugin.prototype._pipelineStreamReturn = function(stream, pool, silent)
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
PoolsPlugin.prototype._pipeline = function(pool, options, silent)
{
    var
        stream = this._pipelineStream(pool);

    return this._pipelineStreamReturn(stream, pool, silent);
};

/**
 * Task build
 */
PoolsPlugin.prototype._taskBuild = function(options)
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
PoolsPlugin.prototype._taskWatch = function(options)
{
    var
        acetone  = this._acetone,
        pools    = this.pools,
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
PoolsPlugin.prototype._logPoolFile = function(pool, file)
{
    if (file.isNull()) {
        return;
    }

    console.log(
        this.getId(),
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
PoolsPlugin.prototype._prettyBytes = function(num)
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

module.exports = PoolsPlugin;
