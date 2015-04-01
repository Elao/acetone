'use strict';

var
    // Acetone
    SourcePatternSolver = require('./SourcePatternSolver');

/**
 * Glob Source Pattern Solver
 */
function GlobSourcePatternSolver(acetone)
{
    SourcePatternSolver.call(this, acetone);
}

GlobSourcePatternSolver.prototype = Object.create(SourcePatternSolver.prototype);

/**
 * Match a pattern
 */
GlobSourcePatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'glob_source';
};

/**
 * Solve a pattern into an array of sources
 */
GlobSourcePatternSolver.prototype.solve = function(pattern)
{
    var
        sources = [];

    this._acetone.fileSystem.glob(pattern.definition.glob).forEach(function(dir) {

        sources = sources.concat(
            SourcePatternSolver.prototype.solve.call(this, {
                type: pattern.type,
                id:   pattern.id,
                definition: {
                    dir:     dir,
                    options: pattern.definition.options
                }
            })
        );

    }.bind(this));

    return sources;
};

module.exports = GlobSourcePatternSolver;
