'use strict';


/**
 * Library Collection
 */
function LibraryCollection()
{
    this._libraries = null;
    this._patterns = [];
    this._patternSolvers = [];
}


/**
 * Add pattern solver
 */
LibraryCollection.prototype.addPatternSolver = function(solver)
{
    this._patternSolvers.push(solver);

    return this;
};

/**
 * Add pattern
 */
LibraryCollection.prototype.addPattern = function(pattern)
{
    this._patterns.push(pattern);

    return this;
};

/**
 * Find
 */
LibraryCollection.prototype.find = function()
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

    return this._libraries;
};

/**
 * Get paths
 */
LibraryCollection.prototype.getPaths = function()
{
    var
        paths = [];

    this.find().forEach(function(library) {
        paths.push(library.getPath());
    });

    return paths;
};


module.exports = LibraryCollection;
