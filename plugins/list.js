'use strict';


module.exports = function(acetone)
{
    return {
        // Gulp task
        gulpTask: function(callback) {
            var
                gulpUtil = require('gulp-util'),
                chalk    = require('chalk'),
                bundles, libraries;

            // Parameters
            if (!gulpUtil.env.bundles && !gulpUtil.env.libraries && !gulpUtil.env.pools) {
                gulpUtil.env.bundles   = true;
                gulpUtil.env.libraries = true;
                gulpUtil.env.pools     = true;
            }

            // List bundles
            if (gulpUtil.env.bundles) {
                bundles = acetone.bundles.find();

                gulpUtil.log('Found', chalk.cyan(bundles.length), 'bundles');

                bundles.forEach(function(bundle) {
                    gulpUtil.log('-', bundle.getId(), chalk.magenta(bundle.getPath()));
                    if (bundle.hasDescription()) {
                        gulpUtil.log(' ', chalk.cyan(bundle.getDescription()));
                    }
                });
            }

            // List libraries
            if (gulpUtil.env.libraries) {
                libraries = acetone.libraries.find();

                gulpUtil.log('Found', chalk.cyan(libraries.length), 'libraries');

                libraries.forEach(function(library) {
                    gulpUtil.log('-', chalk.magenta(library.getPath()));
                    if (library.hasDescription()) {
                        gulpUtil.log(' ', chalk.cyan(library.getDescription()));
                    }
                });
            }

            // List pools
            if (gulpUtil.env.pools) {
                gulpUtil.log('Added', chalk.cyan(acetone.poolHandlers.length), 'pool handlers');

                // Pool handlers
                acetone.poolHandlers.forEach(function(poolHandler)
                {
                    var
                        pools;

                    gulpUtil.log('-', poolHandler.getId());
                    if (poolHandler.hasDescription()) {
                        gulpUtil.log(' ', chalk.cyan(poolHandler.getDescription()));
                    }

                    // Pools
                    pools = poolHandler.pools.find();
                    gulpUtil.log('     Found', chalk.cyan(pools.length), 'pools');
                    pools.forEach(function(pool) {
                        gulpUtil.log('     -', pool.getName());
                        gulpUtil.log('      ', chalk.cyan('src: '), chalk.magenta(
                            pool.getSrc()
                        ));
                        gulpUtil.log('      ', chalk.cyan('dest:'), chalk.magenta(
                            poolHandler.getDestPath(pool.getDest())
                        ));
                    });
                });
            }

            callback();
        }
    };
};
