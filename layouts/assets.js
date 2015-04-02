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

    // Acetone source patterns
    acetone.sources
        .addSource('assets', {
            description: 'Assets directory'
        });
}

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "assets" directory as a source';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
