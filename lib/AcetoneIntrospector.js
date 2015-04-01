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
        pluginsPath: ''
    }, options || {});

    // Introspection
    this.introspection = {
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

module.exports = AcetoneIntrospector;
