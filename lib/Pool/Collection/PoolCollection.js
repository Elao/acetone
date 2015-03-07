'use strict';


/**
 * Pool Collection
 */
function PoolCollection()
{
    this._pools = null;
    this._patterns = [];
    this._patternSolvers = [];
}


/**
 * Add pattern solver
 */
PoolCollection.prototype.addPatternSolver = function(solver)
{
    this._patternSolvers.push(solver);

    return this;
};

/**
 * Add pattern
 */
PoolCollection.prototype.addPattern = function(pattern)
{
    this._patterns.push(pattern);

    return this;
};

/**
 * Find
 */
PoolCollection.prototype.find = function(filter)
{
    // Lazy solve patterns
    if (this._pools ===  null) {
        this._pools = [];
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern)) {
                    this._pools = this._pools.concat(patternSolver.solve(pattern));
                }
            }.bind(this));
        }.bind(this));
    }

    // No filter
    if (!filter) {
        return this._pools;
    }

    // Filter
    return this._pools.filter(function(pool) {
        return filter.indexOf(pool.getName()) !== -1;
    });
};


module.exports = PoolCollection;
