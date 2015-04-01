'use strict';

var
    // Acetone
    SourcePatternSolver     = require('../PatternSolver/SourcePatternSolver'),
    GlobSourcePatternSolver = require('../PatternSolver/GlobSourcePatternSolver');

/**
 * Source collection
 */
function SourceCollection(acetone)
{
    // Acetone
    this._acetone = acetone;

    // Sources
    this._sources = null;

    // Patterns
    this._patterns = [];

    // Pattern solvers
    this._patternSolvers = [
        new SourcePatternSolver(this._acetone),
        new GlobSourcePatternSolver(this._acetone)
    ];
}

/**
 * Add pattern
 */
SourceCollection.prototype._addPattern = function(type, id, definition)
{
    this._patterns.push({
        type:       type,
        id:         id,
        definition: definition
    });

    return this;
};

/**
 * Add source
 *
 * (dir)
 * (id, dir)
 * (dir, options)
 * (id, dir, options)
 * @return {SourceCollection}
 */
SourceCollection.prototype.addSource = function()
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

    this._addPattern('source', id, {
            dir:     dir,
            options: options
        });

    return this;
};

/**
 * Add glob source
 *
 * (glob)
 * (id, glob)
 * (glob, options)
 * (id, glob, options)
 * @return {SourceCollection}
 */
SourceCollection.prototype.addGlobSource = function()
{
    var
        id, glob, options = {};

    // Handle arguments
    if (arguments.length === 1) {
        id = glob = arguments[0];
    } else if (arguments.length === 2) {
        if (typeof(arguments[1]) === 'object') {
            id = glob = arguments[0];
            options = arguments[1];
        } else {
            id = arguments[0];
            glob = arguments[1];
        }
    } else {
        id = arguments[0];
        glob = arguments[1];
        options = arguments[2];
    }

    this._addPattern('glob_source', id, {
            glob:    glob,
            options: options
        });

    return this;
};

/**
 * Find
 */
SourceCollection.prototype.forEach = function(callback)
{
    // Lazy solve patterns
    if (this._sources === null) {
        this._sources = [];
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern)) {
                    this._sources = this._sources.concat(patternSolver.solve(pattern));
                }
            }.bind(this));
        }.bind(this));
    }

    this._sources.forEach(function(source) {
        callback(source);
    });
};

/**
 * Get paths
 */
SourceCollection.prototype.getPaths = function()
{
    var
        paths = [];

    this.forEach(function(source) {
        paths.push(source.getPath());
    });

    return paths;
};

module.exports = SourceCollection;
