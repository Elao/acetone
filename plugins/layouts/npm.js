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

    // Acetone library patterns
    acetone.libraries
        .addLibrary('npm', 'node_modules', {
            description: 'Npm modules'
        });
}

Plugin.prototype = Object.create(LayoutPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Define "node_modules" dir as a library';
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
