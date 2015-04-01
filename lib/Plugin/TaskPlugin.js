'use strict';

var
    // Acetone
    Plugin               = require('./Plugin'),
    PluginTaskCollection = require('../Task/Collection/PluginTaskCollection');

/**
 * Task plugin
 */
function TaskPlugin(acetone, alias, options)
{
    // Constructor
    Plugin.call(this, acetone, alias, options);

    // Tasks
    this._tasks = new PluginTaskCollection(this);
    
    this._acetone
        .tasksGroup.add(this._tasks);
}

TaskPlugin.prototype = Object.create(Plugin.prototype);

/**
 * Get description
 */
TaskPlugin.prototype.getDescription = function()
{
    return 'Task plugin';
};

module.exports = TaskPlugin;
