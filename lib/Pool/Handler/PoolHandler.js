'use strict';


var
    PoolCollection = require('../Collection/PoolCollection');

/**
 * Pool handler
 */
function PoolHandler(fileSystem, id, type, destDir, description)
{
    this._fileSystem = fileSystem;

    this._id = id;
    this._type = type;
    this._destDir = destDir;
    this._description = description || null;

    // Pools
    this.pools = new PoolCollection();
}


/**
 * Get id
 */
PoolHandler.prototype.getId = function()
{
    return this._id;
};

/**
 * Get type
 */
PoolHandler.prototype.getType = function()
{
    return this._type;
};

/**
 * Has description
 */
PoolHandler.prototype.hasDescription = function()
{
    return this._description ? true : false;
};

/**
 * Get description
 */
PoolHandler.prototype.getDescription = function()
{
    return this._description;
};

/**
 * Add pool pattern solver
 */
PoolHandler.prototype.addPoolPatternSolver = function(solver)
{
    this.pools
        .addPatternSolver(solver);

    return this;
};

/**
 * Add pool pattern
 */
PoolHandler.prototype.addPoolPattern = function(pattern)
{
    this.pools
        .addPattern(pattern);

    return this;
};


/**
 * Get dest path
 */
PoolHandler.prototype.getDestPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._destDir);

    return this._fileSystem.getDestPath.apply(
        this._fileSystem,
        args
    );
};


module.exports = PoolHandler;
