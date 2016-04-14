'use strict'

/**
 * This is a simple logger to track the service entry/exit time via service hook
 * The logic in class is quite simple, it also works as a demonstration of how to 
 * develop a policy handler 
 *
 * @author lizh 
 */

var PolicyHandler         = require('../').PolicyHandler;
var logger                = require('debug')('policy:simplelogger');

class SimpleLogger extends PolicyHandler {
	constructor() {
		super();
	}

	preInvoke(context, cont) {
		var now = new Date();
		logger('[Entry] resource-path: <' 
								+ context.req.originalUrl 
								+ '>; method: <' 
								+ context.req.method 
								+ '>; sessionId: <' 
								+ ((context.req.session) ? context.req.session.id : '-')
								+ '>; middleware-fn: <' 
								+ context.bindings.name 
								+ '> @' + now.toISOString());
	  cont();
	}

	postInvoke(context, cont) {
		var now = new Date();
		logger('[Exit] resource-path: <' 
								+ context.req.originalUrl 
								+ '>; method: <' 
								+ context.req.method 
								+ '>; statusCode: <' 
								+ ((context.res.statusCode) ? context.res.statusCode : '-')
								+ '>; sessionId: <' 
								+ ((context.req.session) ? context.req.session.id : '-')
								+ '>; middleware-fn: <' 
								+ context.bindings.name 
								+ '> @' + now.toISOString());
		cont();
	}

	getName() {
		return 'SimpleLogger';
	}
}

module.exports = exports = SimpleLogger;
