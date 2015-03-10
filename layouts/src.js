'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        dir: 'src'
    });

    // Acetone - Bundle Patterns
    acetone
        .addBundlePattern('src', {
            dir:         options.dir,
            description: 'Common sources'
        });
};
