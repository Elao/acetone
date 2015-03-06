'use strict';


var
    PoolHandler = require('../lib/Pool/Handler/Handler'),
    BundlePoolPatternSolver = require('../lib/Pool/BundlePoolPatternSolver');


module.exports = function(acetone, options)
{
    var
        gulp = require('gulp'),
        handler;

    // Options
    options = require('defaults')(options || {}, {
        id:          'browserify',
        srcDir:      options.dir ? options.dir : 'js',
        destDir:     options.dir ? options.dir : 'js',
        glob:        '**/[!_]*.js',
        description: 'Handles js assets with browserify',
        // Browserify
        noParse:     ['jquery']
    });

    // Handler
    handler = new PoolHandler(
        acetone.fileSystem,
        options.id,
        options.destDir,
        options.description
    );

    acetone
        .addPoolHandler(handler);

    // Pools Patterns Solvers
    handler
        .addPoolPatternSolver(new BundlePoolPatternSolver(acetone.bundles))
        .addPoolPattern({
            srcDir: options.srcDir,
            glob:   options.glob
        });

    // Gulp pipeline
    function gulpPipeline(pool, debug, silent, watch) {
        var
            browserify     = require('browserify'),
            source         = require('vinyl-source-stream'),
            buffer         = require('vinyl-buffer'),
            gulpSourcemaps = require('gulp-sourcemaps'),
            gulpUglify     = require('gulp-uglify'),
            gulpSize       = require('gulp-size'),
            gulpIf         = require('gulp-if'),
            path           = require('path'),
            src            = './' +  pool.getSrc(),
            dest           = handler.getDestPath(pool.getDest()),
            args           = {
                paths:   acetone.libraries.getPaths(),
                noParse: options.noParse
            },
            bundler;

        function bundle() {
            var
                srcComments = require('comment-parser')(
                    require('fs').readFileSync(src, 'utf8')
                ),
                bundleRequire  = [],
                bundleExternal = [];

            // Parse bundle options from comments
            srcComments.forEach(function(srcComment) {
                srcComment.tags.forEach(function(tag) {
                    if (tag.name) {
                        switch(tag.tag) {
                            case 'require':
                                if (tag.description) {
                                    bundleRequire.push({
                                        file: tag.name,
                                        expose: tag.description
                                    });
                                } else {
                                    bundleRequire.push(tag.name);
                                }
                                break;
                            case 'external':
                                bundleExternal.push(tag.name);
                                break;
                        }
                    }
                });
            });

            return bundler
                .require(bundleRequire)
                .external(bundleExternal)
                .bundle()
                    .pipe(source(path.basename(src)))
                    .pipe(buffer())
                    .pipe(gulpIf(debug,
                        gulpSourcemaps.init()
                    ))
                    .pipe(gulpIf(!debug,
                        gulpUglify()
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

        if (watch || false) {
            var
                watchify = require('watchify'),
                defaults = require('defaults');

            bundler  = watchify(
                browserify(src, defaults(
                    args,
                    watchify.args
                ))
            );

            bundler.on('update', bundle);

            return bundler.bundle();
        } else {
            bundler = browserify(src, args);

            return bundle();
        }
    }

    function gulpTask(watch) {
        var
            PoolFlattenizer = require('../lib/Pool/Flattenizer/Flattenizer'),
            mergeStream = require('merge-stream'),
            poolFlattenizer, pools, stream;

        pools = handler.pools
            .find(acetone.options.get('pools'));

        if (!pools.length) {
            return null;
        }

        stream = mergeStream();

        poolFlattenizer = new PoolFlattenizer(acetone.fileSystem);

        pools.forEach(function(pool) {
            poolFlattenizer.flatten(pool).forEach(function(flattenPool) {
                stream.add(
                    gulpPipeline(
                        flattenPool,
                        acetone.options.is('debug'),
                        acetone.options.is('silent'),
                        watch || false
                    )
                );
            });
        });

        return stream;
    }

    return {
        // Gulp task
        gulpTask: function() {
            return gulpTask();
        },
        // Gulp watch
        gulpWatch: function() {
            return gulpTask(true);
        }
    };
};
