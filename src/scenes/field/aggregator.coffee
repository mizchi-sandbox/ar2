module.exports =
  initState: (props) ->
    entities: []
    cx: 0
    cy: 0
    score: 0
    focus:
      x: -1000
      y: -1000
    stage:
      width: 0
      height: 0
    bodies: []

  aggregate: (props, state) ->
    state
