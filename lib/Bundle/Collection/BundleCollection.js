'use strict';


/**
 * Bundle Collection
 */
function BundleCollection()
{
    this._bundles = null;
    this._patterns = [];
    this._patternSolvers = [];
}


/**
 * Add pattern solver
 */
BundleCollection.prototype.addPatternSolver = function(solver)
{
    this._patternSolvers.push(solver);

    return this;
};

/**
 * Add pattern
 */
BundleCollection.prototype.addPattern = function(id, pattern)
{
    this._patterns.push({id: id, pattern: pattern});

    return this;
};

/**
 * Find
 */
BundleCollection.prototype.find = function()
{
    // Lazy solve patterns
    if (this._bundles === null) {
        this._bundles = [];
        this._patterns.forEach(function(pattern) {
            this._patternSolvers.forEach(function(patternSolver) {
                if (patternSolver.match(pattern.pattern)) {
                    this._bundles = this._bundles.concat(patternSolver.solve(pattern.id, pattern.pattern));
                }
            }.bind(this));
        }.bind(this));
    }

    return this._bundles;
};

/**
 * Get paths
 */
BundleCollection.prototype.getPaths = function()
{
    var
        paths = [];

    this.find().forEach(function(bundle) {
        paths.push(bundle.getPath());
    });

    return paths;
};


module.exports = BundleCollection;
