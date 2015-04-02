'use strict';

var
    // Acetone
    AcetoneLayout = require('../lib/Layout/Layout');

/**
 * Layout
 */
function Layout(acetone, options)
{
    // Constructor
    AcetoneLayout.call(this, acetone, options);

    // Acetone library patterns
    acetone.libraries
        .addLibrary('npm', 'node_modules', {
            description: 'Npm modules'
        });
}

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "node_modules" dir as a library';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
