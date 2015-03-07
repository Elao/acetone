'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        dir: 'components'
    });

    // Acetone - Library Patterns
    acetone
        .addLibraryPattern({
            bundleDir: options.dir
        });
};
