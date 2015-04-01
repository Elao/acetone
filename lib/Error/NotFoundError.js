'use strict';

/**
 * Not found error
 */
function NotFoundError(message)
{
    this.message = message;
}

NotFoundError.prototype = Object.create(Error.prototype);

module.exports = NotFoundError;
