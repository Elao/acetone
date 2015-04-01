'use strict';

var
    // Acetone
    Library       = require('./Library'),
    NotFoundError = require('../Error/NotFoundError');

/**
 * Source library
 */
function SourceLibrary(source, id, dir, options)
{
    // Source
    this._source = source;

    // Id
    this._id = id;

    if (!this._source.hasPath(dir)) {
        throw new NotFoundError('Dir "' + dir +'" does not exists.');   
    }

    // Dir
    this._dir = dir;

    // Options
    this._options = options || {};
}

SourceLibrary.prototype = Object.create(Library.prototype);

/**
 * Get path
 */
SourceLibrary.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._dir);

    return this._source.getPath.apply(
        this._source,
        args
    );
};


/**
 * Get description
 */
SourceLibrary.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        this._source.getDescription();
};

module.exports = SourceLibrary;
