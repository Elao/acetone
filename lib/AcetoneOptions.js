'use strict';


/**
 * Acetone options
 *
 * @class
 * @param {Object} options Options
 */
function AcetoneOptions(options)
{
    /**
     * Options
     *
     * @type {Object}
     * @protected
     */
    this._options = options || {};

    /**
     * Default options
     *
     * @type {Object}
     * @protected
     */
    this._defaultOptions = {
        path:    '',
        destDir: 'public',
        debug:   false,
        silent:  false,
        pools:   null
    };
}

/**
 * Get
 *
 * @param {String} option Option name
 * @return {*}
 * @protected
 */
AcetoneOptions.prototype._get = function(option)
{
    return (typeof(this._options[option]) !== 'undefined') ?
        this._options[option] : (
            (typeof(this._defaultOptions[option]) !== 'undefined') ?
                this._defaultOptions[option] : undefined
            );
};

/**
 * Is
 *
 * @param {String} option Option name
 * @return {Boolean}
 * @protected
 */
AcetoneOptions.prototype._is = function(option)
{
    return this._get(option) ? true : false;
};

/**
 * Set default option value
 *
 * @param {String} option Option name
 * @param {*}      option Option value
 * @return {AcetoneOptions}
 */
AcetoneOptions.prototype.setDefault = function(option, value)
{
    this._defaultOptions[option] = value;

    return this;
};

/**
 * Get path option
 *
 * @return {String}
 */
AcetoneOptions.prototype.getPath = function()
{
    return this._get('path');
};

/**
 * Get dest dir option
 *
 * @return {String}
 */
AcetoneOptions.prototype.getDestDir = function()
{
    return this._get('destDir');
};

/**
 * Is debug option ?
 *
 * @return {Boolean}
 */
AcetoneOptions.prototype.isDebug = function()
{
    return this._is('debug');
};

/**
 * Is silent option ?
 *
 * @return {Boolean}
 */
AcetoneOptions.prototype.isSilent = function()
{
    return this._is('silent');
};

/**
 * Get pools option
 *
 * @return {null|Array}
 */
AcetoneOptions.prototype.getPools = function()
{
    return this._get('pools');
};


module.exports = AcetoneOptions;
