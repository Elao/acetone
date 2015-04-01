'use strict';

/**
 * Pool collection group
 */
function PoolCollectionGroup()
{
    this._pools = [];
}

/**
 * Add pool collection
 */
PoolCollectionGroup.prototype.add = function(pools)
{
    this._pools.push(pools);

    return this;
};

/**
 * Get pool collection
 */
PoolCollectionGroup.prototype.get = function(id)
{
    var
        pools;

    if (!this._pools.some(function(_pools) {
        if (_pools.getId() === id) {
            pools = _pools;
            return true;
        }
    })) {
        throw new Error('Pools "' + id + '" does not exists.');
    }

    return pools;
};

/**
 * For each
 */
PoolCollectionGroup.prototype.forEach = function(callback)
{
    this._pools.forEach(function(pools) {
        callback(pools);
    });
};

module.exports = PoolCollectionGroup;
