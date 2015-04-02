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
 * Load layout
 *
 * @protected
 * @param {String} module  Module
 * @param {Object} options Options
 * @return {Layout}
 */
Acetone.prototype._loadLayout = function(module, options)
{
    return require(
        _path.join(this.options.get('layoutsPath'), module)
    )(this, options);
};

/**
 * Layout
 *
 * @param {String} module  Module
 * @param {Object} options Options
 * @return {Acetone}
 */
Acetone.prototype.layout = function(module, options)
{
    this._loadLayout(module, options);

    return this;
};

/**
 * Load plugin
 *
 * @protected
 * @param {String} module  Module
 * @param {String} id      Id
 * @param {Object} options Options
 * @return {Layout}
 */
Acetone.prototype._loadPlugin = function(module, id, options)
{
    return require(
        _path.join(this.options.get('pluginsPath'), module)
    )(this, id, options);
};

/**
 * Plugin
 *
 * (module)
 * (id, module)
 * (module, options)
 * (id, module, options)
 *
 * @return {Plugin}
 */
Acetone.prototype.plugin = function()
{
    var
        module, id, options = {},
        plugin;

    // Handle arguments
    if (arguments.length === 1) {
        module = id = arguments[0];
    } else if (arguments.length === 2) {
        if (typeof(arguments[1]) === 'object') {
            module = id = arguments[0];
            options = arguments[1];
        } else {
            id = arguments[0];
            module = arguments[1];
        }
    } else {
        id = arguments[0];
        module = arguments[1];
        options = arguments[2];
    }

    plugin = this._loadPlugin(module, id, plugin);

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

module.exports = Acetone;
