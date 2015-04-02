'use strict';

var
    // Acetone
    TaskCollection = require('./TaskCollection');

/**
 * Plugin task collection
 */
function PluginTaskCollection(plugin, options)
{
    // Plugin
    this._plugin = plugin;

    // Constructor
    TaskCollection.call(this, null, options);
}

PluginTaskCollection.prototype = Object.create(TaskCollection.prototype);

/**
 * Get id
 */
PluginTaskCollection.prototype.getId = function()
{
    return this._plugin.getId();
};

/**
 * Get description
 */
PluginTaskCollection.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        this._plugin.getDescription();
};

module.exports = PluginTaskCollection;
