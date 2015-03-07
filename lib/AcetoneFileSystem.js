'use strict';


var
    _fs   = require('fs'),
    _path = require('path'),
    _glob = require('glob');


/**
 * Acetone File System
 */
function AcetoneFileSystem(options)
{
    this._options = options;

    // Glob options to speed up
    this._globSymlinks = Object.create(null);
    this._globStatCache = Object.create(null);
    this._globCache = Object.create(null);
}

/**
 * Get path
 */
AcetoneFileSystem.prototype.getPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    args.unshift(this._options.getPath());

    return _path.normalize(
        _path.join.apply(
            _path,
            args
        )
    );
};

/**
 * Has path
 */
AcetoneFileSystem.prototype.hasPath = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return _fs.existsSync(
        this.getPath.apply(
            this,
            args
        )
    );
};

/**
 * Glob
 */
AcetoneFileSystem.prototype.glob = function()
{
    var
        args = Array.prototype.slice.call(arguments);

    return _glob.sync(
        _path.join.apply(
            _path,
            args
        ),
        {
            cwd:       this._options.getPath(),
            symlinks:  this._globSymlinks,
            statCache: this._globStatCache,
            cache:     this._globCache
        }
    );
};

/**
 * Get dest path
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
 * Rimraf path
 *
 * Use custom delete method instead of dedicated module such as "del"
 * to lighten dependencies
 * See: https://gist.github.com/liangzan/807712#comment-337828
 */
AcetoneFileSystem.prototype.rimrafPath = function(path, callback)
{
    function loop(path, self) {
        var
            files, i, filePath;

        try {
            files = _fs.readdirSync(path);
        } catch(e) {
            return;
        }

        if (files.length > 0) {
            for (i = 0; i < files.length; i++) {
                filePath = _path.join(path, files[i]);
                if (_fs.statSync(filePath).isFile()) {
                    _fs.unlinkSync(filePath);
                } else {
                    loop(filePath);
                }
            }
        }

        if (typeof(self) === 'undefined' || self === true) {
            _fs.rmdirSync(path);
        }
    }

    loop(path, false);

    callback();
};


module.exports = AcetoneFileSystem;
