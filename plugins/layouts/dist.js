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

    // Acetone default options
    acetone
        .options
            .setDefault('destDir', 'dist');
}

Plugin.prototype = Object.create(LayoutPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Set "dist" dir as default destination dir';
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
