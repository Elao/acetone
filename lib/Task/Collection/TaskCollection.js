'use strict';

var
    // Acetone
    Task = require('../Task');

/**
 * Task collection
 */
function TaskCollection(id, options)
{
    // Id
    this._id = id;

    // Options
    this._options = options || {};

    // Tasks
    this._tasks = [];
}

/**
 * Get id
 */
TaskCollection.prototype.getId = function()
{
    return this._id;
};

/**
 * Add task
 *
 * @param {String}   name     Name
 * @param {Callable} callable Callable
 * @param {Object}   options  Options
 * @return {TaskCollection}
 */
TaskCollection.prototype.addTask = function(name, callable, options)
{
    this._tasks
        .push(new Task(name, callable, options));

    return this;
};

/**
 * For each
 */
TaskCollection.prototype.forEach = function(callback)
{
    this._tasks.forEach(function(task) {
        callback(task);
    });
};

/**
 * Get functions
 */
TaskCollection.prototype.getFunctions = function()
{
    var
        functions = {};

    this.forEach(function(task) {
        functions[task.getId()] = task.getFunction();
    });

    return functions;
};

/**
 * Get description
 */
TaskCollection.prototype.getDescription = function()
{
    return this._options.description ?
        this._options.description :
        '';
};

module.exports = TaskCollection;
