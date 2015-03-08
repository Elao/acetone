'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/PoolHandler'),
    BundlePoolPatternSolver = require('../lib/Pool/PatternSolver/BundlePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../lib/Pool/PatternSolver/LibraryPoolPatternSolver');


module.exports = function(acetone, options)
{
    var
        gulp = require('gulp'),
        poolHandler;

    // Options
    options = require('defaults')(options || {}, {
        id:          'images',
        srcDir:      options.dir ? options.dir : 'images',
        destDir:     options.dir ? options.dir : 'images',
        glob:        '**',
        description: 'Handles images assets'
    });

    // Pool handler
    poolHandler = new PoolHandler(
        acetone.fileSystem,
        options.id,
        options.destDir,
        options.description
    );

    acetone
        .addPoolHandler(poolHandler);

    // Pools Patterns Solvers
    poolHandler
        .addPoolPatternSolver(new BundlePoolPatternSolver(acetone.bundles))
        .addPoolPatternSolver(new LibraryPoolPatternSolver(acetone.libraries))
        .addPoolPattern({
            srcDir: options.srcDir,
            glob:   options.glob
        });

    // Gulp pipeline
    function gulpPipeline(pool, debug, silent) {
        var
            gulpImagemin = require('gulp-imagemin'),
            gulpChanged  = require('gulp-changed'),
            gulpSize     = require('gulp-size'),
            gulpIf       = require('gulp-if'),
            src          = pool.getSrc(),
            dest         = poolHandler.getDestPath(pool.getDest()),
            args         = {
                optimizationLevel: 7
            };

        return gulp
            .src(src)
                .pipe(gulpIf(debug,
                    gulpChanged(dest)
                ))
                .pipe(gulpIf(!debug,
                    gulpImagemin(args)
                ))
                .pipe(gulpIf(!silent,
                    gulpSize({
                        showFiles: true,
                        title: pool.getName()
                    })
                ))
                .pipe(
                    gulp.dest(dest)
                );
    }

    return {
        // Gulp task
        gulpTask: function() {
            var
                mergeStream = require('merge-stream'),
                pools,
                stream;

            pools = poolHandler.pools
                .find(acetone.options.getPools());

            if (!pools.length) {
                return null;
            }

            stream = mergeStream();

            pools.forEach(function(pool) {
                stream.add(
                    gulpPipeline(
                        pool,
                        acetone.options.isDebug(),
                        acetone.options.isSilent()
                    )
                );
            });

            return stream;
        }
    };
};
