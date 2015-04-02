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
        .addLibrary('lib', {
            description: 'Library directory'
        });
}

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "lib" directory as a library';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
