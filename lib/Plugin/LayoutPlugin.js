'use strict';

var
    // Acetone
    Plugin = require('./Plugin');

/**
 * Layout plugin
 */
function LayoutPlugin(acetone, alias, options)
{
    // Constructor
    Plugin.call(this, acetone, alias, options);
}

LayoutPlugin.prototype = Object.create(Plugin.prototype);

/**
 * Get description
 */
LayoutPlugin.prototype.getDescription = function()
{
    return 'Layout plugin';
};

module.exports = LayoutPlugin;
