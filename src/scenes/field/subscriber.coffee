clone = require 'clone'

module.exports = (subscribe) ->
  subscribe 'stage:update', (context) -> (serialized) ->
    context.update(serialized)

  subscribe 'lifecycle:created', (context) -> () ->
    game.createNewStage()
    game.start()

  subscribe 'lifecycle:paused', (context) -> () ->
    game.pause()

  subscribe 'lifecycle:resumed', (context) -> () ->
    game.start()

  subscribe 'io:open-menu', (context) -> (serialized) ->
    console.log 'open menu'
    app.pushWorld 'menu', {}
