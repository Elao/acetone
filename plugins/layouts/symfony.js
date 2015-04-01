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
        dir: 'assets'
    }, options);

    // Constructor
    LayoutPlugin.call(this, acetone, alias, options);

    // Acetone source patterns
    acetone.sources
        .addGlobSource(
            function(source) {
                if (source.getPath().match(/app\/Resources/)) {
                    return 'app';
                }
                return source.getPath()
                    .replace(/(.*)app\//, '')
                    .replace(new RegExp('\/Resources\/' + options.dir + '(.*)$'), '')
                    .replace(/\//g, '') + 'App';
            },
            'app/**/Resources/' + options.dir,
            {
                description: 'Symfony application'
            }
        )
        .addGlobSource(
            function(source) {
                return source.getPath()
                    .replace(/(.*)src\//, '')
                    .replace(new RegExp('\/Resources\/' + options.dir + '(.*)$'), '')
                    .replace(/Bundle/g, '')
                    .replace(/\//g, '') + 'Bundle';
            },
            'src/**/*Bundle/Resources/' + options.dir,
            {
                description: 'Symfony bundle'
            }
        );

    // Acetone default options
    acetone
        .options
            .setDefault('destDir', 'web/assets');
}

Plugin.prototype = Object.create(LayoutPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Define "assets" (or custom choosen one) resources bundle and/or app symfony dirs as sources' +
        '\nAlso set "web/assets" as default destination dir';
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
