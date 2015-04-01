'use strict';

var
    // Acetone
    LayoutPlugin = require('../../lib/Plugin/LayoutPlugin');

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    var
        dir = 'bower_components',
        bowerConfig;

    // Constructor
    LayoutPlugin.call(this, acetone, alias, options);

    // Find bower components dir in .bowerrc
    try {
        bowerConfig = this._acetone.fileSystem.readFile('.bowerrc');
        bowerConfig = JSON.parse(bowerConfig);
        if (bowerConfig.directory) {
            dir = bowerConfig.directory;
        }
    } catch(error) {
        // ¯\_(ツ)_/¯
    }

    // Acetone library patterns
    acetone.libraries
        .addLibrary('bower', dir, {
            description: 'Bower components'
        });
}

Plugin.prototype = Object.create(LayoutPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Define "bower_components" (or custom .bowerrc one) dir as a library';
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
