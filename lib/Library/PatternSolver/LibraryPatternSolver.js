'use strict';

var
    // Acetone
    Library = require('../Library');

/**
 * Library Pattern Solver
 */
function LibraryPatternSolver(acetone)
{
    // Acetone
    this._acetone = acetone;
}

/**
 * Match a pattern
 */
LibraryPatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'library';
};

/**
 * Solve a pattern into an array of libraries
 */
LibraryPatternSolver.prototype.solve = function(pattern)
{
    var
        library,
        libraries = [];

    library = new Library(
        this._acetone,
        pattern.id,
        pattern.definition.dir,
        pattern.definition.options
    );
    
    libraries.push(library);

    return libraries;
};

module.exports = LibraryPatternSolver;
