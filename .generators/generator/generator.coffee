module.exports = (g, {$1}) ->
  g.gen 'default-generator.coffee.hbs', ".generators/#{$1}/generator.coffee"
  g.gen 'dummy.json.hbs', ".generators/#{$1}/#{$1}.json.hbs"