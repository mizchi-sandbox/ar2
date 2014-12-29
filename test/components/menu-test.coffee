require '../test-helper'
component = require '../../src/components/menu'
element = React.createFactory component

describe 'components/menu', ->
  describe '#render', ->
    it 'should validate output', ->
      rendered = React.renderToString(element {})
