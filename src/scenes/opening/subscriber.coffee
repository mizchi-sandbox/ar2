module.exports = (subscribe) ->
  subscribe 'opening:update', (context) -> (args...) ->
    context.update {}
