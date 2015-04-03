'use strict';

var
    // Core
    _path = require('path'),
    // Public
    xtend     = require('xtend'),
    glob2base = require('glob2base');

/**
 * Acetone File System
 *
 * @class
 * @param {Object}         fs      Node file system
 * @param {glob}           glob    Glob
 * @param {AcetoneOptions} options Options
 */
function AcetoneFileSystem(fs, glob, options)
{
    /**
     * File system
     *
     * @protected
     * @type {Object}
     */
    this._fs = fs;

    /**
     * Glob
     *
     * @protected
     * @type {glob}
     */
    this._glob = glob;

    /**
     * Glob cache
     *
     * @protected
     * @type {Object}
     */
    this._globCache = {
        symlinks:  Object.create(null),
        statCache: Object.create(null),
        cache:     Object.create(null)
    };

    /**
     * Options
     *
     * @protected
     * @type {AcetoneOptions}
     */
    this._options = options;

    /**
     * Cache
     *
     * @protected
     * @type {AcetoneOptions}
     */
    this._cache = {
        realPath: {}
    };
}

/**
 * Read file
 *
 * Accept multiple path parameters, they will be joined together
 *
 * @param {...String} path Path
 * @return {String}
 */
AcetoneFileSystem.prototype.readFile = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return this._fs.readFileSync(
        this.getPath.apply(
            this,
            args
        ),
        'utf8'
    );
};

/**
 * Get path
 *
 * Accept multiple path parameters, they will be joined together
 *
 * @param {...String} path Path
 * @return {String}
 */
AcetoneFileSystem.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._options.get('path'));

    return _path.join.apply(
        _path,
        args
    );
};

/**
 * Get real path
 *
 * Accept multiple path parameters, they will be joined together
 *
 * @param {...String} path Path
 * @return {String}
 */
AcetoneFileSystem.prototype.getRealPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return this._fs.realpathSync(
        this.getPath.apply(
            this,
            args
        ),
        this._cache.realPath
    );
};

/**
 * Has path
 *
 * Accept multiple path parameters, they will be joined together
 *
 * @param {...String} path Path
 * @return {Boolean}
 */
AcetoneFileSystem.prototype.hasPath = function()
{
    var
        args = Array.prototype.slice.call(arguments),
        path;

    path = this.getPath.apply(
        this,
        args
    );

    // If path is a glob, remove the magic part
    if (this._glob.hasMagic(path)) {
        path = this.globBase(path);
    }

    return this._fs.existsSync(path);
};

/**
 * Get destination path
 *
 * Accept multiple path parameters, they will be joined together
 *
 * @param {...String} path Path
 * @return {String}
 */
AcetoneFileSystem.prototype.getDestPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._options.get('destDir'));

    return this.getPath.apply(
        this,
        args
    );
};

/**
 * Glob
 *
 * Accept multiple path parameters, they will be joined together
 *
 * @param {...String} path Path
 * @return {Array}
 */
AcetoneFileSystem.prototype.glob = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return this._glob.sync(
        _path.join.apply(
            _path,
            args
        ),
        {
            cwd:       this._options.get('path'),
            symlinks:  this._globCache.symlinks,
            statCache: this._globCache.statCache,
            cache:     this._globCache.cache
        }
    );
};

/**
 * Glob base
 *
 * @param {String} path Path
 * @return {String}
 */
AcetoneFileSystem.prototype.globBase = function(path)
{
    return glob2base(
        new this._glob.Glob(path)
    );
};

/**
 * Rimraf path
 *
 * Use custom delete method instead of dedicated module such as "del"
 * to lighten dependencies
 * See: https://gist.github.com/liangzan/807712#comment-337828
 *
 * @callback callback
 * @param {String}   path     Path
 * @param {Object}   options  Options
 * @param {callback} callback Callback
 */
AcetoneFileSystem.prototype.rimrafPath = function(path, options, callback)
{
    var
        minimatches = [];

    // Options
    options = xtend({
        exclude: null
    }, options || {});

    // Handle exclusions
    if (options.exclude instanceof Array) {
        options.exclude.forEach(function(glob) {
            minimatches.push(
                (new this._glob.Glob(glob)).minimatch
            );
        }.bind(this));
    }

    function isPathExcluded(path) {
        var
            match = false;

        minimatches.forEach(function(minimatch) {
            if (minimatch.match(path)) {
                match = true;
            }
        });

        return match;
    }

    function loop(fs, path, self) {
        var
            files, i, filePath;

        try {
            files = fs.readdirSync(path);
        } catch(e) {
            return;
        }

        if (files.length > 0) {
            for (i = 0; i < files.length; i++) {
                filePath = _path.join(path, files[i]);

                if (isPathExcluded(filePath)) {
                    continue;
                }

                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                } else {
                    loop(fs, filePath);
                }
            }
        }

        if (typeof(self) === 'undefined' || self === true) {
            fs.rmdirSync(path);
        }
    }

    loop(this._fs, path, false);

    callback();
};

module.exports = AcetoneFileSystem;
