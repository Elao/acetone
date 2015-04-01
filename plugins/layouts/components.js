'use strict';

var
    // Public
    xtend = require('xtend'),
    // Acetone
    LayoutPlugin = require('../../lib/Plugin/LayoutPlugin');

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    // Options
    options = xtend({
        id:          null,
        dir:         'components',
        description: 'Components'
    }, options);

    // Constructor
    LayoutPlugin.call(this, acetone, alias, options);

    // Acetone library patterns
    acetone.libraries
        .addSourceLibrary(
            options.id ? options.id: options.dir, 
            options.dir,
            {
                description: options.description
            }
        );
}

Plugin.prototype = Object.create(LayoutPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Define "components" (or custom choosen one) source dirs as libraries';
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
