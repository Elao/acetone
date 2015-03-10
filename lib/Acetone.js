'use strict';


var
    BundleCollection = require('./Bundle/Collection/BundleCollection'),
    LibraryCollection = require('./Library/Collection/LibraryCollection');


/**
 * Acetone
 *
 * @class
 * @param {AcetoneFileSystem} fileSystem Acetone file system
 * @param {AcetoneOptions}    options    Acetone options
 */
function Acetone(fileSystem, options)
{
    /**
     * File system
     *
     * @type {AcetoneFileSystem}
     */
    this.fileSystem = fileSystem;

    /**
     * Options
     *
     * @type {AcetoneOptions}
     */
    this.options = options;

    /**
     * Bundles
     *
     * @type {BundleCollection}
     */
    this.bundles = new BundleCollection();

    /**
     * Libraries
     *
     * @type {LibraryCollection}
     */
    this.libraries = new LibraryCollection();

    /**
     * Pool Handlers
     *
     * @type {Array}
     */
    this.poolHandlers = [];
}


/**
 * Add bundle pattern solver
 *
 * @param {BundlePatternSolver} solver Solver
 * @return {Acetone}
 */
Acetone.prototype.addBundlePatternSolver = function(solver)
{
    this.bundles
        .addPatternSolver(solver);

    return this;
};

/**
 * Add bundle pattern
 *
 * @param {String} id      Id
 * @param {Object} pattern Pattern
 * @return {Acetone}
 */
Acetone.prototype.addBundlePattern = function(id, pattern)
{
    this.bundles
        .addPattern(id, pattern);

    return this;
};

/**
 * Add library pattern solver
 *
 * @param {LibraryPatternSolver} solver Solver
 * @return {Acetone}
 */
Acetone.prototype.addLibraryPatternSolver = function(solver)
{
    this.libraries
        .addPatternSolver(solver);

    return this;
};

/**
 * Add library pattern
 *
 * @param {Object} pattern Pattern
 * @return {Acetone}
 */
Acetone.prototype.addLibraryPattern = function(pattern)
{
    this.libraries
        .addPattern(pattern);

    return this;
};

/**
 * Add pool handler
 *
 * @param {PoolHandler} handler Pool handler
 * @return {Acetone}
 */
Acetone.prototype.addPoolHandler = function(handler)
{
    this.poolHandlers
        .push(handler);

    return this;
};

/**
 * Get pool handler
 *
 * @param  {String} id Id
 * @throws {Error}
 * @return {PoolHandler}
 */
Acetone.prototype.getPoolHandler = function(id)
{
    var
        poolHandler;

    this.poolHandlers.some(function(handler) {
        if (handler.getId() === id) {
            poolHandler = handler;
            return true;
        }
    });

    if (typeof(poolHandler) === 'undefined') {
        throw new Error('Could not find handler with id "' + id + '"');
    }

    return poolHandler;
};


module.exports = Acetone;
