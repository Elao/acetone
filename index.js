'use strict';


var
    _util                      = require('gulp-util'),
    Acetone                    = require('./lib/Acetone'),
    AcetoneOptions             = require('./lib/AcetoneOptions'),
    BundlePatternSolver        = require('./lib/Bundle/PatternSolver/BundlePatternSolver'),
    GlobBundlePatternSolver    = require('./lib/Bundle/PatternSolver/GlobBundlePatternSolver'),
    LibraryPatternSolver       = require('./lib/Library/PatternSolver/LibraryPatternSolver'),
    BundleLibraryPatternSolver = require('./lib/Library/PatternSolver/BundleLibraryPatternSolver');


module.exports = function(options)
{
    var
        acetone = new Acetone(
            new AcetoneOptions(options)
        );

    // Default options
    acetone
        .options
            .setDefault('debug',  _util.env.dev || false)
            .setDefault('silent', _util.env.silent || false)
            .setDefault('pools',  typeof(_util.env.pools) === 'string' ? _util.env.pools.split(',') : null);

    // Bundles patterns solvers
    acetone
        .addBundlePatternSolver(
            new BundlePatternSolver(acetone.fileSystem)
        )
        .addBundlePatternSolver(
            new GlobBundlePatternSolver(acetone.fileSystem)
        );

    // Libraries patterns solvers
    acetone
        .addLibraryPatternSolver(
            new LibraryPatternSolver(acetone.fileSystem)
        )
        .addLibraryPatternSolver(
            new BundleLibraryPatternSolver(acetone.bundles)
        );

    // Layouts
    acetone
        .addLayout = function(type, options) {
            require('./layouts/' + type)(this, options);
            return this;
        };

    // Plugins
    acetone
        .plugins = {};
    acetone
        .addPlugin = function() {
            var
                id,
                type,
                options = {};

            // Handle arguments
            if (arguments.length === 1) {
                id = type = arguments[0];
            } else if (arguments.length === 2) {
                if (typeof arguments[1] === 'object') {
                    id = type = arguments[0];
                    options = arguments[1];
                } else {
                    id = arguments[0];
                    type = arguments[1];
                }
            } else {
                id = arguments[0];
                type = arguments[1];
                options = arguments[2];
            }

            // Fix id
            options.id = id;

            // Add plugin
            this.plugins[id] = require('./plugins/' + type)(this, options);

            return this;
        };

    return acetone;
};
