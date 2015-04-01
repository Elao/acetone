'use strict';

var
    // Acetone
    LayoutPlugin = require('../../lib/Plugin/LayoutPlugin');

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    // Constructor
    LayoutPlugin.call(this, acetone, alias, options);

    // Acetone source patterns
    acetone.sources
        .addSource('src', {
            description: 'Source directory'
        });
}

Plugin.prototype = Object.create(LayoutPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Define "src" directory as a source';
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
