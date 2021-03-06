'use strict';

var
    // Acetone
    PoolPatternSolver = require('./PoolPatternSolver'),
    LibraryPool       = require('../LibraryPool'),
    NotFoundError     = require('../../Error/NotFoundError');

/**
 * Library Pool Pattern Solver
 */
function LibraryPoolPatternSolver(acetone)
{
    // Constructor
    PoolPatternSolver.call(this, acetone);
}

LibraryPoolPatternSolver.prototype = Object.create(PoolPatternSolver.prototype);

/**
 * Match a pattern
 */
LibraryPoolPatternSolver.prototype.match = function(pattern)
{
    return pattern.type === 'library_pool';
};

/**
 * Solve a pattern into an array of pools
 */
LibraryPoolPatternSolver.prototype.solve = function(pattern)
{
    var
        pool, pools = [];

    // Try to find src glob in every available library
    this._acetone.libraries.forEach(function(library) {

        try {
            pool = new LibraryPool(
                this._acetone,
                library,
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

module.exports = LibraryPoolPatternSolver;
