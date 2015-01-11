Physics = require 'PhysicsJS'
Physics.behavior 'constant-friction', ( parent ) ->
  defaults = {f: 0.00002}
  init: ( options ) ->
    parent.init.call( this );
    @options.defaults( defaults );
    @options( options );
    @_v = new Physics.vector();

  behave: ( data ) ->
    bodies = this.getTargets();
    f = 0.0002

    for body in bodies
      ax = 0
      ay = 0
      cof = body.cof

      if body.state.vel.x > 0
        ax -= f * cof
      else if body.state.vel.x < 0
        ax += f * cof

      if body.state.vel.y > 0
        ay -= f * cof
      else if body.state.vel.y < 0
        ay += f * cof

      @_v.clone {x: ax, y: ay}
      body.accelerate( @_v );
