clone = require 'clone'

module.exports = (subscribe) ->
  subscribe 'stage:update', (context) -> (serialized) ->
    context.update(serialized)
