'use strict';

var
    // Acetone
    Plugin               = require('./Plugin'),
    PluginTaskCollection = require('../Task/Collection/PluginTaskCollection');

/**
 * Tasks plugin
 */
function TasksPlugin(acetone, id, options)
{
    // Constructor
    Plugin.call(this, acetone, id, options);

    // Tasks
    this._tasks = new PluginTaskCollection(this);
    
    this._acetone
        .tasksGroup.add(this._tasks);
}

TasksPlugin.prototype = Object.create(Plugin.prototype);

/**
 * Get description
 */
TasksPlugin.prototype.getDescription = function()
{
    return 'Tasks plugin';
};

module.exports = TasksPlugin;
