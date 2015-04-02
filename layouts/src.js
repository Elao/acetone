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
        .addSource('src', {
            description: 'Source directory'
        });
}

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "src" directory as a source';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
