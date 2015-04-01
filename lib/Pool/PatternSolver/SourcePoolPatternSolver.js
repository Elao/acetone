'use strict';

var
    // Acetone
    PoolPatternSolver = require('./PoolPatternSolver'),
    SourcePool        = require('../SourcePool'),
    NotFoundError     = require('../../Error/NotFoundError');

/**
 * Source Pool Pattern Solver
 */
function SourcePoolPatternSolver(acetone)
{
    // Constructor
    PoolPatternSolver.call(this, acetone);
}

SourcePoolPatternSolver.prototype = Object.create(PoolPatternSolver.prototype);

/**
 * Match a pattern
 */
SourcePoolPatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'source_pool';
};

/**
 * Solve a pattern into an array of pools
 */
SourcePoolPatternSolver.prototype.solve = function(pattern)
{
    var
        pool, pools = [];

    this._acetone.sources.forEach(function(source) {

        try {
            pool = new SourcePool(
                this._acetone,
                source,
                pattern.id,
                pattern.definition.src,
                pattern.definition.dest
            );
            
            pools.push(pool);
        } catch(error) {
            if (!(error instanceof NotFoundError)) {
                throw error;
            }
        }

    }.bind(this));

    return pools;
};

module.exports = SourcePoolPatternSolver;
