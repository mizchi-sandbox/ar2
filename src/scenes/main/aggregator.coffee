module.exports =
  initState: (props) -> {id: 'initial'}
  aggregate: (props, state) -> {body: 'body of '+state.id}
