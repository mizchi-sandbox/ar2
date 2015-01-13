module.exports = (subscribe) ->
  subscribe 'menu:close', (context) -> (args...) ->
    app.popWorld()
