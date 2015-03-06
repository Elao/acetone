'use strict';


var
    AcetoneOptions = require('./AcetoneOptions'),
    AcetoneFileSystem = require('./AcetoneFileSystem'),
    BundleCollection = require('./Bundle/BundleCollection'),
    LibraryCollection = require('./Library/LibraryCollection');


/**
 * Acetone
 */
function Acetone(options)
{
    // Options
    this.options = new AcetoneOptions(options);

    // File System
    this.fileSystem = new AcetoneFileSystem(this.options);

    // Bundles
    this.bundles = new BundleCollection();

    // Libraries
    this.libraries = new LibraryCollection();

    // Pool Handlers
    this.poolHandlers = [];
}


/**
 * Add bundle pattern solver
 */
Acetone.prototype.addBundlePatternSolver = function(solver)
{
    this.bundles
        .addPatternSolver(solver);

    return this;
};

/**
 * Add bundle pattern
 */
Acetone.prototype.addBundlePattern = function(id, pattern)
{
    this.bundles
        .addPattern(id, pattern);

    return this;
};

/**
 * Add library pattern solver
 */
Acetone.prototype.addLibraryPatternSolver = function(solver)
{
    this.libraries
        .addPatternSolver(solver);

    return this;
};

/**
 * Add library pattern
 */
Acetone.prototype.addLibraryPattern = function(pattern)
{
    this.libraries
        .addPattern(pattern);

    return this;
};

/**
 * Add pool handler
 */
Acetone.prototype.addPoolHandler = function(handler)
{
    return this.poolHandlers.push(handler);
};

/**
 * Get pool handler
 */
Acetone.prototype.getPoolHandler = function(id)
{
    var
        handlerReturn;

    this.poolHandlers.some(function(handler) {
        if (handler.getId() === id) {
            handlerReturn = handler;
            return true;
        }
    });

    if (typeof(handlerReturn) === 'undefined') {
        throw new Error('Could not find handler with id "' + id + '"');
    }

    return handlerReturn;
};

/**
 * Add pool pattern
 */
Acetone.prototype.addPoolPattern = function(name, patterns)
{
    Object.keys(patterns).forEach(function(handler) {
        var
            pattern = patterns[handler];
        pattern.name = name;
        this.getPoolHandler(handler)
            .addPoolPattern(pattern);
    }.bind(this));

    return this;
};


module.exports = Acetone;
