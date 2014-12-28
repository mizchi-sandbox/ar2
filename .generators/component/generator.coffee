changeCase = require 'change-case'
module.exports = (g, {$1}) ->
  g.gen "index.coffee.hbs",   "src/components/#{$1}/index.coffee"
  g.gen "template.jade.hbs",  "src/components/#{$1}/template.jade"
  g.gen "actions.coffee.hbs", "src/components/#{$1}/actions.coffee"
  g.gen "test.coffee.hbs",    "test/components/#{$1}-test.coffee"
