'use strict';


var
    Pool = require('./Pool');


/**
 * Bundle Pool
 */
function BundlePool(bundle, srcDir, glob)
{
    this._bundle = bundle;
    this._srcDir = srcDir;
    this._glob   = glob;

    Pool.call(this);
}


BundlePool.prototype = Object.create(Pool.prototype);


/**
 * Get name
 */
BundlePool.prototype.getName = function()
{
    return this._bundle.getId();
};

/**
 * Get src
 */
BundlePool.prototype.getSrc = function()
{
    return this._bundle.getPath(
        this._srcDir,
        this._glob
    );
};


module.exports = BundlePool;
