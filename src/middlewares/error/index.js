require('./built-in-handler');
require('./async-errors');
require('./custom-handler');
/**
 *  Express built in error handler
 *    throw Error()
 *  Types of errors
 *    Synchronous errors
 *      throw new Error()
 *    Asynchronous errors
 *      callbacks
 *      promise
 *        throw
 *        reject
 *    Route error
 *      non-existent routes
 *      wrong search params
 *      missing body params
 *    Custom error handler
 *      single error handler
 *      multiple error handlers
 *
 *
 */
