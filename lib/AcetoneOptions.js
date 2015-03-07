'use strict';


/**
 * Acetone Options
 */
function AcetoneOptions(options)
{
   this._options = options || {};
   this._defaultOptions = {};
}

/**
 * Set default
 */
AcetoneOptions.prototype.setDefault = function(option, value)
{
    this._defaultOptions[option] = value;

    return this;
};

/**
 * Get
 */
AcetoneOptions.prototype.get = function(option)
{
    return (typeof(this._options[option]) !== 'undefined') ?
        this._options[option] : (
            (typeof(this._defaultOptions[option]) !== 'undefined') ?
                this._defaultOptions[option] : undefined
            );
};

/**
 * Is
 */
AcetoneOptions.prototype.is = function(option)
{
    return this.get(option) ? true : false;
};

/**
 * Get path
 */
AcetoneOptions.prototype.getPath = function()
{
    return this.get('path');
};

/**
 * Get dest dir
 */
AcetoneOptions.prototype.getDestDir = function()
{
    return this.get('destDir');
};

/**
 * Is debug
 */
AcetoneOptions.prototype.isDebug = function()
{
    return this.is('debug');
};

/**
 * Is silent
 */
AcetoneOptions.prototype.isSilent = function()
{
    return this.is('silent');
};

/**
 * Get pools
 */
AcetoneOptions.prototype.getPools = function()
{
    return this.get('pools');
};


module.exports = AcetoneOptions;
