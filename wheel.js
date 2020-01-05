  var combine = 1;
  var stop_combining = 0;
  var start_combining = 0;
  var prev_angle = 0;

  function info() {
  var label = document.getElementById('in_out_info')
  label.innerHTML = 'out' 
  var label = document.getElementById('combine_info')
  label.innerHTML = 'combine: ' + combine + ', start_combining: ' + start_combining + ', stop_combining: ' + stop_combining
  }

  function move_in() {
  start_combining=0
  stop_combining=1
  // info()
  }

  function move_out() {
  stop_combining=0
  start_combining=1
  // info()
  }

function init_propellers(document) {
    var back = document.getElementById('back');
    var front = document.getElementById('front');

    var propeller_back = new Propeller(back, {speed: 0});

    new Propeller(front, {
      speed: 0,

      onRotate: function() {
        // var label = document.getElementById('angle');    
        // label.innerHTML = this.angle.toFixed(2);

        if(combine==1) {
          var delta = this.angle - prev_angle;
          propeller_back.angle += delta;
          prev_angle = this.angle;
        }
        prev_angle = this.angle;
},

      onDragStop: function() {
        back.style.pointerEvents='none';
        front.style.pointerEvents='none';
        target = Math.round(this.angle/30.0)*30.0;
        from = this.angle;
        var self = this;
        $({ n: from }).animate({ n: target }, {
          duration: 200,
          complete: function() {
            if(stop_combining==1){
              combine = 0;
              stop_combining=0;
            }
            if(start_combining==1){
              combine = 1;
              start_combining=0;
            }
            back.style.pointerEvents='auto';
            front.style.pointerEvents='auto';
          },
          step: function(now, fx) {
            self.angle = now;
          }
      });

  prev_angle = this.angle;
    },

  onDragStart: function() {
    prev_angle = this.angle;
    if(stop_combining==1){
      combine = 0;
      stop_combining=0;
    }
    if(start_combining==1){
      combine = 1;
      start_combining=0;
    }
  }

  });

}
