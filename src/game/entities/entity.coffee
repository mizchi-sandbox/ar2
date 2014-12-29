uuid = require 'node-uuid'
{EventEmitter} = require 'events'

module.exports =
class Entity extends EventEmitter
  @type: 'entity'
  constructor: () ->
    super
    @id = uuid()
    @x = 0
    @y = 0
    @rad = 0
    @life = 1
    @attackableTypes = null

  step: ->
    # console.log 'update:', @id

  isAlive: -> @life > 0
  isDead: -> not @isAlive()

  dispose: ->

  serialize: ->
    {
      @x
      @y
      @rad
      type: @constructor.type
    }

  isAttackable: -> Boolean(@attackableTypes?.length)

  canAttackTo: (entity) ->
    entity isnt @ and
      entity.suffer? and  # TODO 攻撃対象となり得るのかを属性で定義する
      entity.constructor.type in @attackableTypes ? [] and
      entity.isAlive() and
      @x - 15 <= entity.x <= @x + 15 and
      @y - 15 <= entity.y <= @y + 15

  computeAttackPower: -> 1

  attack: (entity) ->
    # TODO 対象と自分のパラメータからダメージ量を算出
    damage = @computeAttackPower()
    entity.suffer damage
