import Stage = require('../stages/stage');
import Entity = require('../entities/entity');

function formatPhysicsBody(body: any){
    var obj:any = {
      name: body.name,
      pos: body.state.pos.values(),
      angle: body.state.angular.pos
    }
    if(body.name === 'circle'){
      obj.radius = body.radius;
    } else if(body.name === 'rectangle'){
      obj.width = body.width;
      obj.height = body.height;
      obj.x = body.x;
      obj.y = body.y;
    } else if(body.name === 'convex-polygon'){
      obj.vertices = body.geometry.vertices;
    }
    return obj;
}

function serializeEntity(entity: Entity){
  return {
    id: entity.id,
    groupId: entity.groupId,
    x: entity.x, y: entity.y,
    dir: entity.dir,
    body: formatPhysicsBody(entity.physicsBody),
    type: (<any>entity.constructor).type
  };
}

//TODO: remove player camera controller from this function
function serialize(game, stage: Stage, target: Entity){
  var cx = target.x-320;
  var cy = target.y-240;
  return {
    cx: cx,
    cy: cy,
    cnt: stage.cnt,
    stage: {
      width: stage.width,
      height: stage.height
    },
    entities: stage.entities.map(e => serializeEntity(e)),
    focus: game.inputBuffer.focus,
    /*bodies: formatBodies,*/
  };
}
export = serialize;
