'use strict';

var
    // Core
    _path = require('path'),
    // Acetone
    Plugin              = require('./Plugin/Plugin'),
    SourceCollection    = require('./Source/Collection/SourceCollection'),
    LibraryCollection   = require('./Library/Collection/LibraryCollection'),
    TaskCollectionGroup = require('./Task/Collection/Group/TaskCollectionGroup'),
    PoolCollectionGroup = require('./Pool/Collection/Group/PoolCollectionGroup');

/**
 * Acetone
 *
 * @class
 * @param {AcetoneFileSystem} fileSystem Acetone file system
 * @param {AcetoneOptions}    options    Acetone options
 */
function Acetone(fileSystem, options)
{
    /**
     * File system
     *
     * @type {AcetoneFileSystem}
     */
    this.fileSystem = fileSystem;

    /**
     * Options
     *
     * @type {AcetoneOptions}
     */
    this.options = options;

    /**
     * Sources
     *
     * @type {SourceCollection}
     */
    this.sources = new SourceCollection(this);

    /**
     * Libraries
     *
     * @type {LibraryCollection}
     */
    this.libraries = new LibraryCollection(this);

    /**
     * Tasks group
     *
     * @type {TaskCollectionGroup}
     */
    this.tasksGroup = new TaskCollectionGroup();

    /**
     * Pools group
     * 
     * @protected
     * @type {PoolCollectionGroup}
     */
    this.poolsGroup = new PoolCollectionGroup();
}

/**
 * Plugin
 *
 * (module)
 * (alias, module)
 * (module, options)
 * (alias, module, options)
 *
 * @return {Acetone}
 */
Acetone.prototype.plugin = function()
{
    var
        module, alias, options = {},
        plugin;

    // Handle arguments
    if (arguments.length === 1) {
        module = alias = arguments[0];
    } else if (arguments.length === 2) {
        if (typeof(arguments[1]) === 'object') {
            module = alias = arguments[0];
            options = arguments[1];
        } else {
            alias = arguments[0];
            module = arguments[1];
        }
    } else {
        alias = arguments[0];
        module = arguments[1];
        options = arguments[2];
    }

    plugin = require(
        _path.join(this.options.get('pluginsPath'), module)
    )(this, alias, options);

    if (plugin && (plugin instanceof Plugin)) {
        return plugin;
    }
};

/**
 * Get tasks functions
 *
 * @param {String} id Id
 * @return {Plugin}
 */
Acetone.prototype.tasks = function(id)
{
    return this.tasksGroup
        .get(id)
            .getFunctions();
};

/**
 * Get pools
 *
 * @param {String} id Id
 * @return {Plugin}
 */
Acetone.prototype.pools = function(id)
{
    return this.poolsGroup
        .get(id);
};

module.exports = Acetone;
