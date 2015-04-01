'use strict';

var
    // Core
    _fs   = require('fs'),
    _path = require('path'),
    // Public
    chalk = require('chalk'),
    // Acetone
    TaskPlugin          = require('../../lib/Plugin/TaskPlugin'),
    AcetoneIntrospector = require('../../lib/AcetoneIntrospector');

/**
 * Plugin
 */
function Plugin(acetone, alias, options)
{
    // Constructor
    TaskPlugin.call(this, acetone, alias, options);

    // Acetone tasks
    this._tasks
        .addTask('all', this._taskAll, {
            scope:       this,
            description: 'List all'
        })
        .addTask('availablePlugins', this._taskAvailablePlugins, {
            scope:       this,
            description: 'List available Plugins'
        })
        .addTask('options', this._taskOptions, {
            scope:       this,
            description: 'List options'
        })
        .addTask('tasks', this._taskTasks, {
            scope:       this,
            description: 'List tasks'
        })
        .addTask('sources', this._taskSources, {
            scope:       this,
            description: 'List sources'
        })
        .addTask('libraries', this._taskLibraries, {
            scope:       this,
            description: 'List libraries'
        })
        .addTask('pools', this._taskPools, {
            scope:       this,
            description: 'List pools'
        });
}

Plugin.prototype = Object.create(TaskPlugin.prototype);

/**
 * Get description
 */
Plugin.prototype.getDescription = function()
{
    return 'Give informations';
};

/**
 * Task all
 */
Plugin.prototype._taskAll = function()
{
    var
        self = this;

    return function(callback) {
        self._taskAvailablePlugins()(function() {});
        self._taskOptions()(function() {});
        self._taskTasks()(function() {});
        self._taskSources()(function() {});
        self._taskLibraries()(function() {});
        self._taskPools()(function() {});
        callback();
    };
};

/**
 * Task available Plugins
 */
Plugin.prototype._taskAvailablePlugins = function()
{
    var
        pluginsPath = this._acetone.options.get('pluginsPath');

    return function(callback) {
        console.log(chalk.bold('\nAvailable plugins:\n'));

        function walk(dir, callback, baseDir) {
            _fs.readdirSync(dir).forEach(function(file) {
                var
                    filePath = _path.join(dir, file);
                if (_fs.statSync(filePath).isFile()) {
                    callback(_path.relative(baseDir ? baseDir : dir, filePath));
                } else {
                    walk(filePath, callback, dir);
                }
            });                
        }

        walk(pluginsPath, function(pluginFile) {
            var
                acetoneIntrospector, plugin;

            if (_path.extname(pluginFile) !== '.js' || _path.basename(pluginFile, '.js')[0] === '_') {
                return;
            }

            acetoneIntrospector = new AcetoneIntrospector({
                pluginsPath: pluginsPath
            });

            plugin = acetoneIntrospector.plugin(pluginFile.replace('.js', ''));

            if (plugin) {
                console.log('-', chalk.cyan(plugin.getAlias()), chalk.gray(plugin.getDescription()));

                acetoneIntrospector.introspection.librariesPatternSolvers.forEach(function() {
                    console.log('  *', 'Add a library pattern solver');
                });

                acetoneIntrospector.introspection.librariesPatterns.forEach(function(libraryPattern) {
                    console.log('  *', 'Add a "' + libraryPattern.type + '" library pattern');
                });

                acetoneIntrospector.introspection.sourcesPatternSolvers.forEach(function() {
                    console.log('  *', 'Add a source pattern solver');
                });

                acetoneIntrospector.introspection.sourcesPatterns.forEach(function(sourcePattern) {
                    console.log('  *', 'Add a "' + sourcePattern.type + '" source pattern');
                });

                acetoneIntrospector.introspection.optionsDefaults.forEach(function(optionDefault) {
                    console.log('  *', 'Set "' + optionDefault.option + '" default option');
                });

                acetoneIntrospector.introspection.tasksGroupTasks.forEach(function(tasksGroupTask) {
                    console.log('  *', 'Add tasks');
                    tasksGroupTask.tasks.forEach(function(task) {
                        console.log('     ', task.getId(), chalk.gray(task.getDescription()));
                    });
                });

                acetoneIntrospector.introspection.poolsGroupPools.forEach(function() {
                    console.log('  *', 'Add pools');
                });
            }
        });

        callback();
    };
};

/**
 * Task tasks
 */
Plugin.prototype._taskTasks = function()
{
    var
        tasksGroup = this._acetone.tasksGroup;

    return function(callback) {
        console.log(chalk.bold('\nTasks:\n'));

        tasksGroup.forEach(function(tasks) {
            console.log('-', chalk.cyan(tasks.getId()), chalk.gray(tasks.getDescription()));

            tasks.forEach(function(task) {
                console.log('   ', task.getId(), chalk.gray(task.getDescription()));
            });

        });

        callback();
    };
};

/**
 * Task options
 */
Plugin.prototype._taskOptions = function()
{
    var
        options = this._acetone.options;

    return function(callback) {
        console.log(chalk.bold('\nOptions:\n'));

        console.log('-', chalk.cyan('path       '), '"' + options.get('path') + '"');
        console.log('-', chalk.cyan('pluginsPath'), '"' + options.get('pluginsPath') + '"');
        console.log('-', chalk.cyan('destDir    '), '"' + options.get('destDir') + '"');
        console.log('-', chalk.cyan('dev        '), options.is('dev') ? 'true' : 'false');
        console.log('-', chalk.cyan('silent     '), options.is('silent') ? 'true' : 'false');
        console.log('-', chalk.cyan('pools      '), options.get('pools'));

        callback();
    };
};

/**
 * Task sources
 */
Plugin.prototype._taskSources = function()
{
    var
        sources = this._acetone.sources;

    return function(callback) {
        console.log(chalk.bold('\nSources:\n'));

        sources.forEach(function(source) {
            console.log('-', chalk.cyan(source.getId()), chalk.gray(source.getDescription()));
            console.log('    path:', chalk.magenta(source.getPath()));
        });

        callback();
    };
};

/**
 * Task libraries
 */
Plugin.prototype._taskLibraries = function()
{
    var
        libraries = this._acetone.libraries;

    return function(callback) {
        console.log(chalk.bold('\nLibraries:\n'));

        libraries.forEach(function(library) {
            console.log('-', chalk.cyan(library.getId()), chalk.gray(library.getDescription()));
            console.log('    path:', chalk.magenta(library.getPath()));
        });

        callback();
    };
};

/**
 * Task pools
 */
Plugin.prototype._taskPools = function()
{
    var
        poolsGroup = this._acetone.poolsGroup;

    return function(callback) {
        console.log(chalk.bold('\nPools:\n'));

        poolsGroup.forEach(function(pools) {
            console.log('-', chalk.cyan(pools.getId()), chalk.gray(pools.getDescription()));

            pools.forEach(function(pool) {
                console.log('  -', chalk.cyan(pool.getId()));
                console.log('      src: ', chalk.magenta(pool.getSrc()));
                console.log('      dest:', chalk.magenta(pool.getDest()));
            });

        });

        callback();
    };
};

module.exports = function(acetone, alias, options)
{
    return new Plugin(acetone, alias, options);
};
