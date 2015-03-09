'use strict';


var
    _path = require('path');


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
     * @type {Object}
     * @protected
     */
    this._fs = fs;

    /**
     * Glob
     *
     * @type {glob}
     * @protected
     */
    this._glob = glob;

    /**
     * Glob cache
     *
     * @type {Object}
     * @protected
     */
    this._globCache = {
        symlinks:  Object.create(null),
        statCache: Object.create(null),
        cache:     Object.create(null)
    };

    /**
     * Options
     *
     * @type {AcetoneOptions}
     * @protected
     */
    this._options = options;
}

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

    args.unshift(this._options.getPath());

    return _path.join.apply(
        _path,
        args
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
        args = Array.prototype.slice.call(arguments);

    return this._fs.existsSync(
        this.getPath.apply(
            this,
            args
        )
    );
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

    args.unshift(this._options.getDestDir());

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
            cwd:       this._options.getPath(),
            symlinks:  this._globCache.symlinks,
            statCache: this._globCache.statCache,
            cache:     this._globCache.cache
        }
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
 * @param {callback} callback Callback
 */
AcetoneFileSystem.prototype.rimrafPath = function(path, callback)
{
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
