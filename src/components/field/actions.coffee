getMainRect = do ->
  main = document.querySelector '.main'
  rect = null
  ->
    main ?= document.querySelector '.main'
    rect ?= main.getBoundingClientRect()

MouseButtons =
  0: 'mouseLeft'
  2: 'mouseRight'

module.exports =
  onMouseMove: (e) ->
    rect = getMainRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    game?.emit 'io:update-focus', {x, y}
    return

  onMouseDown: (e) ->
    game.emit 'io:update-key', MouseButtons[e.button], true
    e.stopPropagation()
    e.preventDefault()
    return

  onMouseUp: (e) ->
    game.emit 'io:update-key', MouseButtons[e.button], false
    e.stopPropagation()
    e.preventDefault()
    return

  onContextMenu: (e) ->
    e.stopPropagation()
    e.preventDefault()
    return

  onClickStop: (e) ->
    @emit 'field:stop'

  onClickRestart: (e) ->
    @emit 'field:restart'
