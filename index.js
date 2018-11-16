/**
 * Policy Router Module 
 *
 * The API Policy Router Module provides policy based API endpoint management. It improve the express router API with extensible policy 
 * hook points(pre and post invocation), which can be used to inject handlers for tracking the API behavior, e.g: including adding API logger, API metrics, rate limiting,
 * and API analytics, also including the API endpoint protection for transport protocol validation as well as instance based dynamical authorization.
 *
 * @author leezhenghui@gmail.com 
 */

//========================================
//       Policy Router
//========================================

const PolicyHandler = require('./lib/policyHandler');
const PolicyRouter = require('./lib/policyRouter');

const HealthChecker = require('./lib/policies/health');

module.exports.PolicyHandler = PolicyHandler;
module.exports.PolicyRouter = PolicyRouter;
module.exports.HealthChecker = HealthChecker;
