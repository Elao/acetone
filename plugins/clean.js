'use strict';


module.exports = function(acetone, options)
{
    // Options
    options = require('defaults')(options || {}, {
        exclude: null
    });

    return {
        // Gulp task
        gulpTask: function(callback) {
            var
                gulpUtil = require('gulp-util'),
                path = acetone.fileSystem.getDestPath();

            if (!acetone.options.isSilent()) {
                gulpUtil.log('Delete', gulpUtil.colors.magenta(path));
            }

            if (options.exclude) {
                if (!(options.exclude instanceof Array)) {
                    options.exclude = [options.exclude];
                }

                options.exclude.forEach(function(glob, index, exclude) {
                    exclude[index] = acetone.fileSystem.getDestPath(glob);
                }.bind(this));
            }

            acetone.fileSystem.rimrafPath(
                path,
                {
                    exclude: options.exclude
                },
                callback
            );
        }
    };
};
