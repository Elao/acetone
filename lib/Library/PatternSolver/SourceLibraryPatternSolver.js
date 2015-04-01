'use strict';

var
    // Acetone
    LibraryPatternSolver = require('./LibraryPatternSolver'),
    SourceLibrary        = require('../SourceLibrary'),
    NotFoundError        = require('../../Error/NotFoundError');

/**
 * Source Library Pattern Solver
 */
function SourceLibraryPatternSolver(acetone)
{
    // Constructor
    LibraryPatternSolver.call(this, acetone);
}

SourceLibraryPatternSolver.prototype = Object.create(LibraryPatternSolver.prototype);

/**
 * Match a pattern
 */
SourceLibraryPatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'source_library';
};

/**
 * Solve a pattern into an array of libraries
 */
SourceLibraryPatternSolver.prototype.solve = function(pattern)
{
    var
        library,
        libraries = [];

    this._acetone.sources.forEach(function(source) {
        try {
            library = new SourceLibrary(
                source,
                pattern.id,
                pattern.definition.dir,
                pattern.definition.options
            );
            
            libraries.push(library);
        } catch(error) {
            if (!(error instanceof NotFoundError)) {
                throw error;
            }
        }
    });

    return libraries;
};

module.exports = SourceLibraryPatternSolver;
