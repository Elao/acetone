'use strict';

var
    // Acetone
    AcetoneLayout = require('../lib/Layout/Layout');

/**
 * Layout
 */
function Layout(acetone, options)
{
    var
        dir = 'bower_components',
        bowerConfig;

    // Constructor
    AcetoneLayout.call(this, acetone, options);

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

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "bower_components" (or custom .bowerrc one) dir as a library';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
