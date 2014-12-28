module.exports = (subscribe) ->
  subscribe 'main:update', (context) -> (id) ->
    console.log 'subbed', id, context.props, context.state
    context.update {id: id}
