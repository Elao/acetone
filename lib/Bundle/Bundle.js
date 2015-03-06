'use strict';


/**
 * Bundle
 */
function Bundle(fileSystem, id, path, description)
{
    this._fileSystem = fileSystem;

    this._id = id;
    this._path = path;
    this._description = description || null;
}


/**
 * Get id
 */
Bundle.prototype.getId = function()
{
    return typeof(this._id) === 'function' ? this._id(this) : this._id;
};

/**
 * Get path
 */
Bundle.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._path);

    return this._fileSystem.getPath.apply(
        this._fileSystem,
        args
    );
};

/**
 * Has path
 */
Bundle.prototype.hasPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._path);

    return this._fileSystem.hasPath.apply(
        this._fileSystem,
        args
    );
};

/**
 * Glob
 */
Bundle.prototype.glob = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._path);

    return this._fileSystem.glob.apply(
        this._fileSystem,
        args
    );
};

/**
 * Has description
 */
Bundle.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get description
 */
Bundle.prototype.getDescription = function()
{
    return this._description;
};


module.exports = Bundle;
