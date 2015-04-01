'use strict';

var
    // Acetone
    PoolCollection = require('./PoolCollection');

/**
 * Plugin pool collection
 */
function PluginPoolCollection(acetone, plugin, options)
{
    // Plugin
    this._plugin = plugin;

    // Constructor
    PoolCollection.call(this, acetone, null, options);
}

PluginPoolCollection.prototype = Object.create(PoolCollection.prototype);

/**
 * Get id
 */
PluginPoolCollection.prototype.getId = function()
{
    return this._plugin.getAlias();
};

/**
 * Add pool
 *
 * (definition)
 * (id, definition)
 * @return {PoolCollection}
 */
PluginPoolCollection.prototype.addPool = function()
{
    var
        id, definition;

    // Handle arguments
    if (arguments.length === 1) {
        id         = this._plugin.getAlias();
        definition = arguments[0];
    } else {
        id         = arguments[0];
        definition = arguments[1];
    }

    this._addPattern('pool', id, definition);

    return this;
};

/**
 * Get description
 */
PluginPoolCollection.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        this._plugin.getDescription();
};

module.exports = PluginPoolCollection;
