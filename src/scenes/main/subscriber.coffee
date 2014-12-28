clone = require 'clone'

module.exports = (subscribe) ->
  subscribe 'stage:update', (context) -> (serialized) ->
    # state = clone(context.state)
    context.update(serialized)

  # subscribe 'input:keydown', (context) -> ([x, y]) ->
  #   state = clone(context.state)
  #   state.player.x += x * 10
  #   state.player.y += y * 10
  #   context.update(state)
  #
  # subscribe 'main:update-mouse', (context) -> ({x, y}) ->
  #   state = clone(context.state)
  #   state.mouse.x = x
  #   state.mouse.y = y
  #   # console.log 'mouse updated', x, y
  #   context.update(state)
  #
  # subscribe 'input:keydown', (context) -> ([x, y]) ->
  #   state = clone(context.state)
  #   state.player.x += x * 10
  #   state.player.y += y * 10
  #   context.update(state)
