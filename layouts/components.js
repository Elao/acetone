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
        id:          null,
        dir:         'components',
        description: 'Components'
    }, options);

    // Constructor
    AcetoneLayout.call(this, acetone, options);

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

Layout.prototype = Object.create(AcetoneLayout.prototype);

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Define "components" (or custom choosen one) source dirs as libraries';
};

module.exports = function(acetone, options)
{
    return new Layout(acetone, options);
};
