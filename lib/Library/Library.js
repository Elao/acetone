'use strict';

var
    // Acetone
    NotFoundError = require('../Error/NotFoundError');

/**
 * Library
 */
function Library(acetone, id, dir, options)
{
    // Acetone
    this._acetone = acetone;

    // Id
    this._id = id;

    if (!this._acetone.fileSystem.hasPath(dir)) {
        throw new NotFoundError('Dir "' + dir +'" does not exists.');   
    }

    // Dir
    this._dir = dir;

    // Options
    this._options = options || {};
}

/**
 * Get id
 */
Library.prototype.getId = function()
{
    return this._id ?
        typeof(this._id) === 'function' ?
            this._id(this) :
            this._id :
        this._dir;
};

/**
 * Get path
 */
Library.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._dir);

    return this._acetone.fileSystem.getPath.apply(
        this._acetone.fileSystem,
        args
    );
};

/**
 * Has path
 */
Library.prototype.hasPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._dir);

    return this._acetone.fileSystem.hasPath.apply(
        this._acetone.fileSystem,
        args
    );
};

/**
 * Get description
 */
Library.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        '';
};

module.exports = Library;
