'use strict';

/**
 * Plugin
 */
function Plugin(acetone, id, options)
{
    // Acetone
    this._acetone = acetone;

    // Id
    this._id = id;

    // Options
    this._options = options || {};
}

/**
 * Get id
 */
Plugin.prototype.getId = function()
{
    return this._id;
};

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Plugin';
};

module.exports = Plugin;
