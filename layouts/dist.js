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

    // Acetone default options
    acetone.options
        .setDefault('destDir', 'dist');
}

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Set "dist" dir as default destination dir';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
