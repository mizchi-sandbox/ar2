declare var app: any;

var global = require('global');
var Player = require('./entities/battlers/player');
var Enemy = require('./entities/battlers/enemies/enemy');
var Stage = require('./stages/stage');
global.EventEmitter = require('events').EventEmitter;

export = Game;
class Game extends EventEmitter {
  static instance = null;
  static getInstance() {
    if(!this.instance)
      this.instance = new Game();
    return this.instance;
  }

  inputBuffer: any;
  running: boolean;
  stage: any;
  fps: number;
  player: any;

  static getActiveStage(){
    return this.getInstance().stage;
  }

  constructor(){
    super();
    global.game = this;

    this.stage = null
    this.inputBuffer = {
      left: false,
      right: false,
      up: false,
      down: false,
      mouseLeft: false,
      mouseRight: false,
      focus: {x: 0, y: 0}
    };

    this.player = new Player(this.inputBuffer);
    this.fps = ~~(1000/60);

    this.on('io:update-focus', (mouseState) => {
      this.updateFocus(mouseState);
    });

    this.on('io:update-key', (key, val) => {
      this.updateKey(key, val);
    });
  }

  public createNewStage(){
    this.stage = new Stage();

    [[250, 200], [400, 100], [100, 450]].forEach((pos) => {
      var enemy = new Enemy
      enemy.x = pos[0];
      enemy.y = pos[1];
      this.stage.entities.push(enemy);
    });
  }

  public updateKey(key, val) {
    /*if(!(this.inputBuffer[key] != null))
      throw key+' is unknown';*/

    console.log('update key', key, val);
    this.inputBuffer[key] = val
  }

  public updateFocus(mouseState) {
    this.inputBuffer.focus.x = mouseState.x+this.player.x-320
    this.inputBuffer.focus.y = mouseState.y+this.player.y-240
  }

  public serialize(){
    var target = this.player;
    var cx = target.x-320;
    var cy = target.y-240;

    return {
      cx: cx,
      cy: cy,
      cnt: this.stage.cnt,
      entities: this.stage.entities.map((e) => e.serialize()),
      focus: this.inputBuffer.focus
    };
  }

  public start(){
    if(this.running){
      console.info('game already running');
      return;
    }

    this.running = true;

    if(!this.stage)
      throw 'you should initialize stage first'

    var fn = () => {
      if(!this.running) return;

      var beforeUpdate = Date.now();
      this.stage.update().then( () => {
        var emitter = app.getActiveEmitter();
        emitter.emit('stage:update', this.serialize());
        var afterUpdate = Date.now();
        setTimeout(fn, this.fps-(afterUpdate-beforeUpdate));
      });
    }
    fn();
  }

  pause(){
    this.running = false
  }
}
