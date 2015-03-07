'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        path: 'assets'
    });

    // Acetone - Bundle Patterns
    acetone
        .addBundlePattern('assets', {
            path:        options.path,
            description: 'Common assets'
        });
};
