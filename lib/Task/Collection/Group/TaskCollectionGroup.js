'use strict';

/**
 * Task collection group
 */
function TaskCollectionGroup()
{
    this._tasks = [];
}

/**
 * Add task collection
 */
TaskCollectionGroup.prototype.add = function(tasks)
{
    this._tasks.push(tasks);

    return this;
};

/**
 * Get task collection
 */
TaskCollectionGroup.prototype.get = function(id)
{
    var
        tasks;

    if (!this._tasks.some(function(_tasks) {
        if (_tasks.getId() === id) {
            tasks = _tasks;
            return true;
        }
    })) {
        throw new Error('Tasks "' + id + '" does not exists.');
    }

    return tasks;
};

/**
 * For each
 */
TaskCollectionGroup.prototype.forEach = function(callback)
{
    this._tasks.forEach(function(tasks) {
        callback(tasks);
    });
};

module.exports = TaskCollectionGroup;
