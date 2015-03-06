'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        dir: 'components'
    });

    // Library Patterns
    acetone
        .addLibraryPattern({
            bundleDir: options.dir
        });
};
