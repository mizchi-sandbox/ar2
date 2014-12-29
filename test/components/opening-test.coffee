require '../test-helper'
component = require '../../src/components/opening'
element = React.createFactory component

describe 'components/opening', ->
  describe '#render', ->
    it 'should validate output', ->
      rendered = React.renderToString(element {})
