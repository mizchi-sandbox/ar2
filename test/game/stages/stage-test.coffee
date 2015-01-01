Stage = require '../../../lib/game/stages/stage'
sinon = require 'sinon'

describe 'Stage', ->
  it 'should exec queues and consume', ->
    stage = new Stage

    spy1 = sinon.spy()
    spy2 = sinon.spy()

    task1 = exec: -> new Promise (done) ->
      setTimeout ->
        spy1()
        done()
      , 0

    task2 = exec: -> new Promise (done) ->
      setTimeout ->
        spy1()
        spy2()
        done()
      , 16

    stage.addTask(task1);
    stage.addTask(task2);
    equal stage.taskQueueCount, 2
    new Promise (done) ->
      stage.update().then ->
        ok spy1.calledTwice
        ok spy2.calledOnce
        equal stage.taskQueueCount, 0
        done()

  it 'should save task to next if it returns with true', ->
    stage = new Stage
    spy1 = sinon.spy()
    task1 = exec: -> new Promise (done) ->
      setTimeout ->
        spy1()
        done(true)

    stage.addTask(task1);
    equal stage.taskQueueCount, 1

    new Promise (done) ->
      stage.update().then ->
        equal stage.taskQueueCount, 1
        ok spy1.calledOnce

        stage.update().then ->
          equal stage.taskQueueCount, 1
          ok spy1.calledTwice
          done()

  it 'should do task by priority', (done) ->
    stage = new Stage
    spy1 = sinon.spy()
    spy2 = sinon.spy()

    task1 =
      exec: ->
        ok spy2.called
        spy1()
        done()
      priority: 0

    task2 =
      exec: ->
        ok not spy1.called
        spy2()
      priority: 1

    stage.addTask(task1);
    stage.addTask(task2);

    stage.update()
