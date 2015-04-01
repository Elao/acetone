'use strict';

var
    // Acetone
    PoolPatternSolver        = require('../PatternSolver/PoolPatternSolver'),
    SourcePoolPatternSolver  = require('../PatternSolver/SourcePoolPatternSolver'),
    LibraryPoolPatternSolver = require('../PatternSolver/LibraryPoolPatternSolver');

/**
 * Pool collection
 */
function PoolCollection(acetone, id, options)
{
    // Acetone
    this._acetone = acetone;

    // Id
    this._id = id;

    // Options
    this._options = options || {};

    // Pools
    this._pools = null;

    // Patterns
    this._patterns = [];
    
    // Pattern solvers
    this._patternSolvers = [
        new PoolPatternSolver(this._acetone),
        new SourcePoolPatternSolver(this._acetone),
        new LibraryPoolPatternSolver(this._acetone)
    ];
}

/**
 * Get id
 */
PoolCollection.prototype.getId = function()
{
    return this._id;
};

/**
 * Add pattern
 */
PoolCollection.prototype._addPattern = function(type, id, definition)
{
    this._patterns.push({
        type:       type,
        id:         id,
        definition: definition
    });

    return this;
};

/**
 * Add pool
 *
 * @return {PoolCollection}
 */
PoolCollection.prototype.addPool = function(id, definition)
{
    this._addPattern('pool', id, definition);

    return this;
};

/**
 * Add source pool
 *
 * (definition)
 * (id, definition)
 * @return {PoolCollection}
 */
PoolCollection.prototype.addSourcePool = function()
{
    var
        id, definition;

    // Handle arguments
    if (arguments.length === 1) {
        definition = arguments[0];
    } else {
        id         = arguments[0];
        definition = arguments[1];
    }

    this._addPattern('source_pool', id, definition);

    return this;
};

/**
 * Add library pool
 *
 * (definition)
 * (id, definition)
 * @return {PoolCollection}
 */
PoolCollection.prototype.addLibraryPool = function()
{
    var
        id, definition;

    // Handle arguments
    if (arguments.length === 1) {
        definition = arguments[0];
    } else {
        id         = arguments[0];
        definition = arguments[1];
    }

    this._addPattern('library_pool', id, definition);

    return this;
};

/**
 * For each
 */
PoolCollection.prototype.forEach = function(callback, filter)
{
    var
        pools;

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
        pools = this._pools;
    } else {
        // Filter
        pools = this._pools.filter(function(pool) {
            return filter.indexOf(pool.getId()) !== -1;
        });
    }

    pools.forEach(function(pool) {
        callback(pool);
    });
};

/**
 * Get description
 */
PoolCollection.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        '';
};

module.exports = PoolCollection;
