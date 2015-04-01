'use strict';

/**
 * Task
 */
function Task(id, callable, options)
{
    // Id
    this._id = id;

    // Callable
    this._callable = callable;

    // Options
    this._options = options || {};
}

/**
 * Get id
 */
Task.prototype.getId = function()
{
    return this._id;
};

/**
 * Get function
 */
Task.prototype.getFunction = function()
{
    if (this._options.scope) {
        return this._callable.bind(this._options.scope);
    } else {
        return this._callable;
    }
};

/**
 * Get description
 */
Task.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        '';
};

module.exports = Task;
