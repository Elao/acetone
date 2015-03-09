'use strict';


module.exports = function(acetone)
{
    return {
        // Gulp task
        gulpTask: function(callback) {
            var
                gulpUtil = require('gulp-util'),
                chalk    = require('chalk'),
                path = acetone.fileSystem.getDestPath();

            if (!acetone.options.isSilent()) {
                gulpUtil.log('Delete', chalk.magenta(path));
            }

            acetone.fileSystem.rimrafPath(path, callback);
        }
    };
};
