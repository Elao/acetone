'use strict';


var
    Library = require('./Library');


/**
 * Bundle Library
 */
function BundleLibrary(bundle, dir)
{
    this._bundle = bundle;
    this._dir = dir;
}


BundleLibrary.prototype = Object.create(Library.prototype);


/**
 * Get path
 */
BundleLibrary.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._dir);

    return this._bundle.getPath.apply(
        this._bundle,
        args
    );
};

/**
 * Glob
 */
BundleLibrary.prototype.glob = function(glob)
{
    return this._bundle.glob(
        this._dir,
        glob
    );
};

/**
 * Has description
 */
BundleLibrary.prototype.hasDescription = function()
{
    return this._bundle.hasDescription();
};

/**
 * Get description
 */
BundleLibrary.prototype.getDescription = function()
{
    return this._bundle.getDescription();
};


module.exports = BundleLibrary;
