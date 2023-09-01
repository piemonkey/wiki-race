'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    debug: {
      LOG_PAYLOADS: true, // data store received to update cache with
      LOG_OPERATIONS: true, // updates to cache remote state
      LOG_MUTATIONS: true, // updates to cache local state
      LOG_NOTIFICATIONS: true,
      LOG_REQUESTS: true, // log Requests issued via the request manager
      LOG_REQUEST_STATUS: true,
      LOG_IDENTIFIERS: true,
      LOG_GRAPH: true,
      LOG_INSTANCE_CACHE: true,
    },
  })

  return app.toTree()
}
