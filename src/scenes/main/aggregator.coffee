module.exports =
  initState: (props) ->
    entities: []
    focus:
      x: -1000
      y: -1000

  aggregate: (props, state) ->
    state
