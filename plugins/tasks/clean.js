'use strict';

var
    // Public
    xtend = require('xtend'),
    chalk = require('chalk'),
    // Acetone
    TaskPlugin = require('../../lib/Plugin/TaskPlugin');

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    // Constructor
    TaskPlugin.call(this, acetone, alias, options);

    // Tasks
    this._tasks
        .addTask('clean', this._taskClean, {
            scope:       this,
            description: 'Clean destination dir'
        });
}

Plugin.prototype = Object.create(TaskPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Clean destination dir';
};

/**
 * Task clean
 */
Plugin.prototype._taskClean = function(options)
{
    var
        acetone = this._acetone;

    // Options
    options = xtend({
        exclude: null
    }, options);

    return function(callback) {
        var
            path = acetone.fileSystem.getDestPath();

        if (!acetone.isSilent()) {
            console.log('Clean', chalk.magenta(path));
        }

        if (options.exclude) {
            if (!(options.exclude instanceof Array)) {
                options.exclude = [options.exclude];
            }

            options.exclude.forEach(function(glob, index, exclude) {
                exclude[index] = acetone.fileSystem.getDestPath(glob);
            }.bind(this));
        }

        acetone.fileSystem.rimrafPath(
            path,
            {
                exclude: options.exclude
            },
            callback
        );
    };
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
