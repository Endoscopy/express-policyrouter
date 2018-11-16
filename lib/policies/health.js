/**
 * The health policy handler.
 *
 * @Author lizh
 *
 */

'use strict'

const PolicyHandler = require('../policyHandler');
const os            = require('os');
const debug         = require('debug')('policyrouter:healthchecker');

class HealthChecker extends PolicyHandler {
  constructor(healthCheckPath) {
    super();

		this.healthCheckPath = healthCheckPath;
		if (! this.healthCheckPath) {
	    throw Error('Invalid parameter for health checker contructor');	
		}
  }

  getName() {
    return 'HealthChecker';
  }

  begin(context, done) {
		let self = this;
		try {
			let req = context.req;
			let res = context.res;

			if (req.originalUrl !== self.healthCheckPath) {
				return done();
			}

			let result = {
				cpus: os.cpus(),
				freemem: os.freemem(),
				totalmem: os.totalmem(),
				loadavg: os.loadavg(),
				process: {
			    cpuUsage: process.cpuUsage(),
					memoryUsage: process.memoryUsage(),
					uptime: process.uptime()
				}
			};
			res.status(200).json(result);
			done({
				reason: 'Interrupt policy handlers processing due to a health check ping',
				_ignored: true
			})
		} catch (err) {
			debug('Error occurs during health checker, due to: ', err);
			done();
		}   
	}

  end(context, done) {
		done();
  }

  preInvoke(context, cont) {
    cont();
  }

  postInvoke(context, cont) {
    cont();
  }

}

module.exports = exports = HealthChecker;
