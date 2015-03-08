'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/PoolHandler'),
    BundlePoolPatternSolver = require('../lib/Pool/PatternSolver/BundlePoolPatternSolver');


module.exports = function(acetone, options)
{
    var
        gulp = require('gulp'),
        poolHandler;

    // Options
    options = require('defaults')(options || {}, {
        id:          'sass',
        srcDir:      options.dir ? options.dir : 'sass',
        destDir:     options.dir ? options.dir : 'css',
        glob:        '**/[!_]*.scss',
        description: 'Handles sass assets',
        // Sass
        precision: 10,
        // Autoprefixer
        browsers:  ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
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
        .addPoolPattern({
            srcDir: options.srcDir,
            glob:   options.glob
        });

    // Gulp pipeline
    function gulpPipeline(pool, debug, silent) {
        var
            gulpSass         = require('gulp-sass'),
            gulpSourcemaps   = require('gulp-sourcemaps'),
            gulpAutoprefixer = require('gulp-autoprefixer'),
            gulpMinifyCss    = require('gulp-minify-css'),
            gulpSize         = require('gulp-size'),
            gulpIf           = require('gulp-if'),
            src              = pool.getSrc(),
            dest             = poolHandler.getDestPath(pool.getDest()),
            args             = {
                errLogToConsole: true,
                outputStyle:     'nested',
                precision:       options.precision,
                includePaths:    acetone.libraries.getPaths()
            };

        return gulp
            .src(src)
                .pipe(gulpIf(debug,
                    gulpSourcemaps.init()
                ))
                .pipe(
                    gulpSass(args)
                )
                .pipe(
                    gulpAutoprefixer({
                        browsers: options.browsers,
                    })
                )
                .pipe(gulpIf(!debug,
                    gulpMinifyCss({
                        keepSpecialComments: 1
                    })
                ))
                .pipe(gulpIf(debug,
                    gulpSourcemaps.write()
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
                pools, stream;

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
        },
        // Gulp watch
        gulpWatch: function() {
            var
                PoolFlattenizer = require('../lib/Pool/Flattenizer/PoolFlattenizer'),
                sassGraph = require('sass-graph'),
                poolFlattenizer,
                pools,
                map = {};

            pools = poolHandler.pools
                .find(acetone.options.getPools());

            if (!pools.length) {
                return null;
            }

            poolFlattenizer = new PoolFlattenizer(acetone.fileSystem);

            pools.forEach(function(pool) {
                poolFlattenizer.flatten(pool).forEach(function(flattenPool) {
                    Object.keys(
                        sassGraph.parseFile(
                            flattenPool.getSrc(),
                            {
                                loadPaths: acetone.libraries.getPaths()
                            }
                        ).index
                    ).forEach(function(file) {
                        if (!map[file]) {
                            map[file] = [flattenPool];
                        } else {
                            map[file].push(flattenPool);
                        }
                    });
                });
            });

            return gulp.watch(Object.keys(map), function(event) {
                if (event.type === 'changed' || event.type === 'deleted') {
                    map[event.path].forEach(function(pool) {
                        gulpPipeline(
                            pool,
                            acetone.options.isDebug(),
                            acetone.options.isSilent()
                        );
                    });
                }
            });
        }
    };
};
