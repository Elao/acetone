'use strict';

var
    // Core
    _fs   = require('fs'),
    _path = require('path'),
    // Public
    minimist = require('minimist'),
    glob     = require('glob'),
    // Acetone
    Acetone           = require('./lib/Acetone'),
    AcetoneOptions    = require('./lib/AcetoneOptions'),
    AcetoneFileSystem = require('./lib/AcetoneFileSystem');

module.exports = function(options)
{
    var
        argv = minimist(process.argv.slice(2)),
        acetoneOptions, acetone;

    // Acetone options
    acetoneOptions = new AcetoneOptions(options, {
        pluginsPath: _path.join(__dirname, 'plugins'),
        dev:         argv.dev || false,
        silent:      argv.silent || false,
        pools:       typeof(argv.pools) === 'string' ? argv.pools.split(',') : null
    });

    // Acetone
    acetone = new Acetone(
        new AcetoneFileSystem(_fs, glob, acetoneOptions),
        acetoneOptions
    );

    return acetone;
};
