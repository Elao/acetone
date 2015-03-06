'use strict';


var
    fs = require('fs');


module.exports = function(acetone)
{
    var
        path = 'bower_components',
        bowerConfig;

    // Find bower components dir in .bowerrc
    try {
        bowerConfig = fs.readFileSync(acetone.fileSystem.getPath('.bowerrc'), 'utf8');
        bowerConfig = JSON.parse(bowerConfig);
        if (bowerConfig.directory) {
            path = bowerConfig.directory;
        }
    } catch(exception) {}

    // Library Patterns
    acetone
        .addLibraryPattern({
            path:        path,
            description: 'Bower components'
        });
};
