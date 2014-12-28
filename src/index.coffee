# requires
window.portal = null
require './setup'
require './router'

window.addEventListener 'DOMContentLoaded', ->
  portal.mount(document.body)
  portal.transition('main', {id: 'foo'})
