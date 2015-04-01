'use strict';

var
    // Core
    _path = require('path'),
    // Acetone
    NotFoundError = require('../Error/NotFoundError');

/**
 * Pool
 */
function Pool(acetone, id, src, dest)
{
    // Acetone
    this._acetone = acetone;

    this._id = id;

    if (!this._acetone.fileSystem.hasPath(src)) {
        throw new NotFoundError('Src "' + src +'" does not exists.');
    }

    this._src = src;
    this._dest = dest || '';
}

/**
 * Get id
 */
Pool.prototype.getId = function()
{
    return this._id;
};

/**
 * Get src
 */
Pool.prototype.getSrc = function()
{
    return this._acetone.fileSystem.getPath(
        this._src
    );
};

/**
 * Get dest
 */
Pool.prototype.getDest = function()
{
    return this._acetone.fileSystem.getDestPath(
        this._dest
    );
};

/**
 * For each
 */
Pool.prototype.forEach = function(callback)
{
    var
        poolSrc = this.getSrc(),
        poolSrcBase, poolDest;

    poolSrcBase = this._acetone.fileSystem.globBase(poolSrc);

    this._acetone.fileSystem.glob(poolSrc)
        .forEach(function(src) {

            poolDest = _path.dirname(src.replace(poolSrcBase, ''));

            poolDest = _path.join(
                this._dest,
                poolDest
            );

            callback(new Pool(
                this._acetone,
                this.getId(),
                src,
                poolDest
            ));


        }.bind(this));
};

module.exports = Pool;
