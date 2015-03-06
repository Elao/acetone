'use strict';


var
    Library = require('./Library');


/**
 * Library Pattern Solver
 */
function LibraryPatternSolver(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Match a pattern
 */
LibraryPatternSolver.prototype.match = function(pattern)
{
    return 'path' in pattern;
};

/**
 * Solve a pattern into an array of libraries
 */
LibraryPatternSolver.prototype.solve = function(pattern)
{
    var
        libraries = [];

    if (this._fileSystem.hasPath(pattern.path)) {
        libraries.push(new Library(
            this._fileSystem,
            pattern.path,
            pattern.description
        ));
    }

    return libraries;
};


module.exports = LibraryPatternSolver;
