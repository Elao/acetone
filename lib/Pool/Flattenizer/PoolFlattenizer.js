'use strict';


var
    Pool        = require('../Pool'),
    _path       = require('path'),
    _glob       = require('glob'),
    _glob2base  = require('glob2base');


/**
 * Pool flattenizer
 */
function PoolFlattenizer(fileSystem)
{
    this._fileSystem = fileSystem;
}


/**
 * Flatten
 */
PoolFlattenizer.prototype.flatten = function(pool)
{
    var
        pools   = [],
        poolSrc = pool.getSrc(),
        poolSrcBase, poolDest;

    poolSrcBase = _glob2base(new _glob.Glob(poolSrc)).replace(/\/$/, '');

    this._fileSystem.glob(
        poolSrc
    ).forEach(function(src) {

        poolDest = _path.dirname(src).replace(poolSrcBase, '').replace(/^\//, '');

        if (poolDest) {
            poolDest = _path.join(
                pool.getDest(),
                poolDest
            );
        }

        pools.push(
            new Pool(
                pool.getName(),
                src,
                poolDest
            )
        );
    });

    return pools;
};


module.exports = PoolFlattenizer;
