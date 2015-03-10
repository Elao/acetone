'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        dir: 'assets'
    });

    // Acetone - Bundle Patterns
    acetone
        .addBundlePattern('assets', {
            dir:         options.dir,
            description: 'Common assets'
        });
};
