'use strict';

var
    // Acetone
    Pool = require('../Pool');

/**
 * Pool Pattern Solver
 */
function PoolPatternSolver(acetone)
{
    // Acetone
    this._acetone = acetone;
}

/**
 * Match a pattern
 */
PoolPatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'pool';
};

/**
 * Solve a pattern into an array of pools
 */
PoolPatternSolver.prototype.solve = function(pattern)
{
    var
        pool, pools = [];

    pool = new Pool(
        this._acetone,
        pattern.id,
        pattern.definition.src,
        pattern.definition.dest
    );

    pools.push(pool);

    return pools;
};

module.exports = PoolPatternSolver;
