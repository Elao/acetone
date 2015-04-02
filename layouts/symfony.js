'use strict';

var
    // Public
    xtend = require('xtend'),
    // Acetone
    AcetoneLayout = require('../lib/Layout/Layout');

/**
 * Layout
 */
function Layout(acetone, options)
{
    // Options
    options = xtend({
        dir: 'assets'
    }, options);

    // Constructor
    AcetoneLayout.call(this, acetone, options);

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
    acetone.options
        .setDefault('destDir', 'web/assets');
}

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "assets" (or custom choosen one) resources bundle and/or app symfony dirs as sources' +
        '\nAlso set "web/assets" as default destination dir';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
