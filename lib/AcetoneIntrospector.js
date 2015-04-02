'use strict';

var
    // Public
    xtend = require('xtend'),
    // Acetone
    Acetone           = require('./Acetone'),
    SourceCollection  = require('./Source/Collection/SourceCollection'),
    LibraryCollection = require('./Library/Collection/LibraryCollection');

/**
 * Acetone introspector
 *
 * @class
 * @param {Object} options Options
 */
function AcetoneIntrospector(options)
{
    // Options
    options = xtend({
        layoutsPath: '',
        pluginsPath: ''
    }, options || {});

    // Introspection
    this.introspection = {
        layouts:                 [],
        plugins:                 [],
        optionsDefaults:         [],
        sourcesPatternSolvers:   [],
        sourcesPatterns:         [],
        librariesPatternSolvers: [],
        librariesPatterns:       [],
        tasksGroupTasks:         [],
        poolsGroupPools:         []
    };

    var
        introspection = this.introspection;

    this.options = {};
    this.options
        .get = function(option) {
            switch(option) {
                case 'layoutsPath':
                    return options.layoutsPath;
                case 'pluginsPath':
                    return options.pluginsPath;
                default:
                    return null;
            }
        };
    this.options
        .setDefault = function(option, value) {
            introspection.optionsDefaults.push({option: option, value: value});
            return this;
        };

    this.sources = new SourceCollection();
    this.sources
        ._addPattern = function(type, definition) {
            introspection.sourcesPatterns.push({type: type, definition: definition});
            return this;
        };

    this.libraries = new LibraryCollection();
    this.libraries
        ._addPattern = function(type, definition) {
            introspection.librariesPatterns.push({type: type, definition: definition});
            return this;
        };

    this.tasksGroup = {};
    this.tasksGroup
        .add = function(tasks) {
            introspection.tasksGroupTasks.push({tasks: tasks});
            return this;
        };

    this.poolsGroup = {};
    this.poolsGroup
        .add = function(pools) {
            introspection.poolsGroupPools.push({pools: pools});
            return this;
        };
}

AcetoneIntrospector.prototype = Object.create(Acetone.prototype);

/**
 * Load layout
 *
 * @protected
 * @param {String} module  Module
 * @param {Object} options Options
 * @return {Layout}
 */
AcetoneIntrospector.prototype._loadLayout = function(module, options)
{
    var
        layout = Acetone.prototype._loadLayout.call(this, module, options);

    this.introspection.layouts.push({module: module, options: options, layout: layout});

    return layout;
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
AcetoneIntrospector.prototype._loadPlugin = function(module, id, options)
{
    var
        plugin = Acetone.prototype._loadPlugin.call(this, module, id, options);

    this.introspection.plugins.push({module: module, id: id, options: options, plugin: plugin});

    return plugin;
};

module.exports = AcetoneIntrospector;
