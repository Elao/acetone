'use strict';

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    // Acetone
    this._acetone = acetone;

    // Alias
    this._alias = alias;

    // Options
    this._options = options || {};
}

/**
 * Get alias
 */
Plugin.prototype.getAlias = function()
{
    return this._alias;
};

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Plugin';
};

module.exports = Plugin;
