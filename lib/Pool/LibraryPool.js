'use strict';

var
	// Acetone
    Pool          = require('./Pool'),
    NotFoundError = require('../Error/NotFoundError');

/**
 * Library Pool
 */
function LibraryPool(acetone, library, id, src, dest)
{
    // Acetone
    this._acetone = acetone;

    this._library = library;
    this._id = id;

    if (!this._library.hasPath(src)) {
        throw new NotFoundError('Src "' + src +'" does not exists.');
    }

    this._src = src;
    this._dest = dest || '';
}

LibraryPool.prototype = Object.create(Pool.prototype);

/**
 * Get id
 */
LibraryPool.prototype.getId = function()
{
    return this._id ?
        this._id :
        this._library.getId();
};

/**
 * Get src
 */
LibraryPool.prototype.getSrc = function()
{
    return this._library.getPath(
        this._src
    );
};

module.exports = LibraryPool;
