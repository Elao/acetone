'use strict';

var
    // Acetone
    Pool          = require('./Pool'),
    NotFoundError = require('../Error/NotFoundError');

/**
 * Source Pool
 */
//function SourcePool(source, srcDir, glob)
function SourcePool(acetone, source, id, src, dest)
{
    // Acetone
    this._acetone = acetone;

    this._source = source;
    this._id = id;

    if (!this._source.hasPath(src)) {
        throw new NotFoundError('Src "' + src +'" does not exists.');
    }

    this._src = src;
    this._dest = dest || '';
}

SourcePool.prototype = Object.create(Pool.prototype);

/**
 * Get id
 */
SourcePool.prototype.getId = function()
{
    return this._id ?
        this._id :
        this._source.getId();
};

/**
 * Get src
 */
SourcePool.prototype.getSrc = function()
{
    return this._source.getPath(
        this._src
    );
};

module.exports = SourcePool;
