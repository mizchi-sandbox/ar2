changeCase = require 'change-case'
module.exports = (g, {$1}) ->
  g.gen "index.coffee.hbs",       "src/scenes/#{$1}/index.coffee"
  g.gen "aggregator.coffee.hbs",  "src/scenes/#{$1}/aggregator.coffee"
  g.gen "subscriber.coffee.hbs", "src/scenes/#{$1}/subscriber.coffee"
  g.gen "test.coffee.hbs",        "test/scenes/#{$1}-test.coffee"
