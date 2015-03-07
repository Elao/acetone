'use strict';


var
    LibraryPatternSolver = require('./LibraryPatternSolver'),
    BundleLibrary = require('../BundleLibrary');


/**
 * Bundle Library Pattern Solver
 */
function BundleLibraryPatternSolver(bundles)
{
    this._bundles = bundles;
}


BundleLibraryPatternSolver.prototype = Object.create(LibraryPatternSolver.prototype);


/**
 * Match a pattern
 */
BundleLibraryPatternSolver.prototype.match = function(pattern)
{
    return 'bundleDir' in pattern;
};

/**
 * Solve a pattern into an array of libraries
 */
BundleLibraryPatternSolver.prototype.solve = function(pattern)
{
    var
        libraries = [];

    this._bundles.find().forEach(function(bundle) {
        if (bundle.hasPath(pattern.bundleDir)) {
            libraries.push(new BundleLibrary(
                bundle,
                pattern.bundleDir
            ));
        }
    }.bind(this));

    return libraries;
};


module.exports = BundleLibraryPatternSolver;
