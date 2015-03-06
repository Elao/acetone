'use strict';


var
    Bundle = require('./Bundle');


/**
 * Bundle Pattern Solver
 */
function BundlePatternSolver(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Match a pattern
 */
BundlePatternSolver.prototype.match = function(pattern)
{
    return 'path' in pattern;
};

/**
 * Solve a pattern into an array of bundles
 */
BundlePatternSolver.prototype.solve = function(id, pattern)
{
    var
        bundles = [];

    if (this._fileSystem.hasPath(pattern.path)) {
        bundles.push(new Bundle(
            this._fileSystem,
            id,
            pattern.path,
            pattern.description
        ));
    }

    return bundles;
};


module.exports = BundlePatternSolver;
