'use strict';


module.exports = function(options)
{
    var
        Acetone = require('./lib/Acetone'),
        acetone = new Acetone(options);

    // Bundles patterns solvers
    var
        BundlePatternSolver = require('./lib/Bundle/BundlePatternSolver'),
        GlobBundlePatternSolver = require('./lib/Bundle/GlobBundlePatternSolver');

    acetone
        .addBundlePatternSolver(new BundlePatternSolver(acetone.fileSystem))
        .addBundlePatternSolver(new GlobBundlePatternSolver(acetone.fileSystem));

    // Libraries patterns solvers
    var
        LibraryPatternSolver = require('./lib/Library/LibraryPatternSolver'),
        BundleLibraryPatternSolver = require('./lib/Library/BundleLibraryPatternSolver');

    acetone
        .addLibraryPatternSolver(new LibraryPatternSolver(acetone.fileSystem))
        .addLibraryPatternSolver(new BundleLibraryPatternSolver(acetone.bundles));

    // Layouts
    acetone
        .addLayout = function(type, options) {
            require('./layouts/' + type)(this, options);
            return this;
        };

    // Plugins
    acetone.plugins = {};
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
