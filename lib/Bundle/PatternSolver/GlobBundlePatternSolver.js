'use strict';


var
    Bundle = require('../Bundle');


/**
 * Glob Bundle Pattern Solver
 */
function GlobBundlePatternSolver(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Match a pattern
 */
GlobBundlePatternSolver.prototype.match = function(pattern)
{
    return 'glob' in pattern;
};

/**
 * Solve a pattern into an array of bundles
 */
GlobBundlePatternSolver.prototype.solve = function(id, pattern)
{
    var
        bundles = [];

    this._fileSystem.glob(pattern.glob).forEach(function(path) {
        bundles.push(new Bundle(
            this._fileSystem,
            id,
            path,
            pattern.description
        ));
    }.bind(this));

    return bundles;
};


module.exports = GlobBundlePatternSolver;
