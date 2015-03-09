'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        dir: 'assets'
    });

    // Acetone - Bundle Patterns
    acetone
        .addBundlePattern(
            function(bundle) {
                if (bundle.getPath().match(/app\/Resources/)) {
                    return 'app';
                }
                return bundle.getPath()
                    .replace(/(.*)app\//, '')
                    .replace(new RegExp('\/Resources\/' + options.dir + '(.*)$'), '')
                    .replace(/\//g, '') + 'App';
            },
            {
                glob: 'app/**/Resources/' + options.dir,
                description: 'Symfony app'
            }
        )
        .addBundlePattern(
            function(bundle) {
                return bundle.getPath()
                    .replace(/(.*)src\//, '')
                    .replace(new RegExp('\/Resources\/' + options.dir + '(.*)$'), '')
                    .replace(/Bundle/g, '')
                    .replace(/\//g, '') + 'Bundle';
            },
            {
                glob: 'src/**/*Bundle/Resources/' + options.dir,
                description: 'Symfony bundle'
            }
        );

    // Acetone - Default options
    acetone
        .setDefaultOption('destDir', 'web/assets');
};
