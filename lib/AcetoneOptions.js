'use strict';

var
    // Public
    xtend = require('xtend');

/**
 * Acetone options
 *
 * @class
 * @param {Object} options        Options
 * @param {Object} defaultOptions Default options
 */
function AcetoneOptions(options, defaultOptions)
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
    this._defaultOptions = xtend({
        path:        '',
        layoutsPath: 'layouts',
        pluginsPath: 'plugins',
        destDir:     '',
        dev:         false,
        silent:      false,
        pools:       null
    }, defaultOptions);
}

/**
 * Get
 *
 * @param {String} option Option name
 * @return {*}
 * @protected
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
 *
 * @param {String} option Option name
 * @return {Boolean}
 * @protected
 */
AcetoneOptions.prototype.is = function(option)
{
    return this.get(option) ? true : false;
};

/**
 * Set default option value
 *
 * @param {String} option Option name
 * @param {*}      value  Option value
 * @return {AcetoneOptions}
 */
AcetoneOptions.prototype.setDefault = function(option, value)
{
    this._defaultOptions[option] = value;

    return this;
};

module.exports = AcetoneOptions;
