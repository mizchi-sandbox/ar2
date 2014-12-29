module.exports =
  initState: (props) ->
    entities: []
    cx: 0
    cy: 0
    focus:
      x: -1000
      y: -1000

  aggregate: (props, state) ->
    state
