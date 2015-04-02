'use strict';

/**
 * Layout
 */
function Layout(acetone, options)
{
    // Acetone
    this._acetone = acetone;

    // Options
    this._options = options || {};
}

/**
 * Get description
 */
Layout.prototype.getDescription = function()
{
    return 'Layout';
};

module.exports = Layout;
