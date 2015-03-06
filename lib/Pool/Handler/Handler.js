'use strict';


var
    PoolCollection = require('../PoolCollection');

/**
 * Handler
 */
function Handler(fileSystem, id, destDir, description)
{
    this._fileSystem = fileSystem;

    this._id = id;
    this._destDir = destDir;
    this._description = description || null;

    // Pools
    this.pools = new PoolCollection();
}


/**
 * Get id
 */
Handler.prototype.getId = function()
{
    return this._id;
};

/**
 * Has description
 */
Handler.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get description
 */
Handler.prototype.getDescription = function()
{
    return this._description;
};

/**
 * Add pool pattern solver
 */
Handler.prototype.addPoolPatternSolver = function(solver)
{
    this.pools
        .addPatternSolver(solver);

    return this;
};

/**
 * Add pool pattern
 */
Handler.prototype.addPoolPattern = function(pattern)
{
    this.pools
        .addPattern(pattern);

    return this;
};


/**
 * Get dest path
 */
Handler.prototype.getDestPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._destDir);

    return this._fileSystem.getDestPath.apply(
        this._fileSystem,
        args
    );
};


module.exports = Handler;
