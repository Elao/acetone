'use strict';

var
    // Acetone
    Source = require('../Source');

/**
 * Source Pattern Solver
 */
function SourcePatternSolver(acetone)
{
    // Acetone
    this._acetone = acetone;
}

/**
 * Match a pattern
 */
SourcePatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'source';
};

/**
 * Solve a pattern into an array of sources
 */
SourcePatternSolver.prototype.solve = function(pattern)
{
    var
        source,
        sources = [];

    source = new Source(
        this._acetone,
        pattern.id,
        pattern.definition.dir,
        pattern.definition.options
    );

    sources.push(source);

    return sources;
};

module.exports = SourcePatternSolver;
