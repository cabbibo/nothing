
function ScrollControls( camera , params ){

  this.camera     = camera;
  var params      = params || {};

  this.dampening  = params.dampening  || .9;
  this.minPos     = params.minPos     || -5;
  this.maxPos     = params.maxPos     ||  0; 
  this.multiplier = params.multiplier || .01;

  this.speed = 0;

  this.position = 0;
  this.oldPosition = 0;
  

  var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"

  window.addEventListener( mousewheelevt, this.onMouseWheel.bind( this ), false );


  window.addEventListener('touchmove', this.onTouchMove.bind( this ) , false);
  window.addEventListener('touchstart', this.onTouchStart.bind( this ) , false);


}



ScrollControls.prototype.update = function(){

  this.camera.position.y += this.speed;

 // console.log( this.camera.position.y );

  if( this.camera.position.y < this.minPos ){

    var dif = this.minPos - this.camera.position.y;

    this.camera.position.y += dif * .1;
    this.speed = 0;
   
    // this.speed += this.

    //console.lo

  }else if( this.camera.position.y > this.maxPos ){

    var dif = this.maxPos - this.camera.position.y;

    this.camera.position.y += dif * .1;
    this.speed = 0;
   
    // this.speed += this.

  }

  this.oldPosition = this.position;
  this.position = this.camera.position.y;

  this.speed *= this.dampening;

}



ScrollControls.prototype.onTouchMove = function( e ){

  var speed;

  for( var i = 0; i < e.touches.length; i++ ){

    if( e.touches[i].identifier == this.oID ){
      speed = e.touches[i].clientY - this.oY;
      this.speed += speed * 10 * this.multiplier;
      //console.log( this.speed ); 
      this.oY = e.touches[i].clientY;

    }
  }

  

  e.preventDefault();


}

ScrollControls.prototype.onTouchStart = function( e ){

  var speed;

  this.oID = e.touches[0].identifier;
  this.oY = e.touches[0].clientY;

}




ScrollControls.prototype.onMouseWheel = function( e ){


  var speed;
  if( (/Firefox/i.test(navigator.userAgent)) ){
    speed = e.detail * -20
  }else{
    speed = e.wheelDeltaY;

  }
  this.speed += speed * this.multiplier; 

}
