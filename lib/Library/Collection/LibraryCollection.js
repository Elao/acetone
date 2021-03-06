'use strict';

var
    // Acetone
    LibraryPatternSolver       = require('../PatternSolver/LibraryPatternSolver'),
    SourceLibraryPatternSolver = require('../PatternSolver/SourceLibraryPatternSolver');

/**
 * Library collection
 */
function LibraryCollection(acetone)
{
    // Acetone
    this._acetone = acetone;

    // Libraries
    this._libraries = null;

    // Patterns
    this._patterns = [];

    // Pattern solvers
    this._patternSolvers = [
        new LibraryPatternSolver(this._acetone),
        new SourceLibraryPatternSolver(this._acetone)
    ];
}

/**
 * Add pattern
 */
LibraryCollection.prototype._addPattern = function(type, id, definition)
{
    this._patterns.push({
        type:       type,
        id:         id,
        definition: definition
    });

    return this;
};

/**
 * Add library
 *
 * (dir)
 * (id, dir)
 * (dir, options)
 * (id, dir, options)
 * @return {LibraryCollection}
 */
LibraryCollection.prototype.addLibrary = function()
{
    var
        id, dir, options = {};

    // Handle arguments
    if (arguments.length === 1) {
        id = dir = arguments[0];
    } else if (arguments.length === 2) {
        if (typeof(arguments[1]) === 'object') {
            id = dir = arguments[0];
            options = arguments[1];
        } else {
            id = arguments[0];
            dir = arguments[1];
        }
    } else {
        id = arguments[0];
        dir = arguments[1];
        options = arguments[2];
    }

    this._addPattern('library', id, {
            dir:     dir,
            options: options
        });

    return this;
};

/**
 * Add source library
 *
 * (dir)
 * (id, dir)
 * (dir, options)
 * (id, dir, options)
 * @return {LibraryCollection}
 */
LibraryCollection.prototype.addSourceLibrary = function()
{
    var
        id, dir, options = {};

    // Handle arguments
    if (arguments.length === 1) {
        id = dir = arguments[0];
    } else if (arguments.length === 2) {
        if (typeof(arguments[1]) === 'object') {
            id = dir = arguments[0];
            options = arguments[1];
        } else {
            id = arguments[0];
            dir = arguments[1];
        }
    } else {
        id = arguments[0];
        dir = arguments[1];
        options = arguments[2];
    }

    this._addPattern('source_library', id, {
            dir:     dir,
            options: options
        });

    return this;
};

/**
 * Find
 */
LibraryCollection.prototype.forEach = function(callback)
{
    // Lazy solve patterns
    if (this._libraries ===  null) {
        this._libraries = [];
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern)) {
                    this._libraries = this._libraries.concat(patternSolver.solve(pattern));
                }
            }.bind(this));
        }.bind(this));
    }

    this._libraries.forEach(function(library) {
        callback(library);
    });
};

/**
 * Get paths
 */
LibraryCollection.prototype.getPaths = function()
{
    var
        paths = [];

    this.forEach(function(library) {
        paths.push(library.getPath());
    });

    return paths;
};

module.exports = LibraryCollection;
