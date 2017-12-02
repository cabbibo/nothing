function Story(){

  this.quantizedEvents = [];
  this.smoothedEvents = [];
  this.scrollEvents = [];
  
}



Story.prototype.AddQuantizedEvent = function( position , callback ){
  this.quantizedEvents.push({
    position: position,
    callback: callback
  });
}


Story.prototype.AddSmoothedEvent = function( start, end , callback ){
  this.smoothedEvents.push({
    start: start,
    end: end,
    callback: callback
  });
}

Story.prototype.AddScrollEvent = function( callback ){
  this.scrollEvents.push({
    callback: callback
  });
}


Story.prototype.update = function( position , oldPosition ){

//console.log(this.quantizedEvents.length);
  for( var i = 0; i < this.quantizedEvents.length; i++ ){

    var e = this.quantizedEvents[i];
    //console.log( i );

    // fire ( going up )
    if( oldPosition > e.position &&  position <= e.position ){

      e.callback( false , position , position - oldPosition  );

    }

    // fire ( going down )
    if( oldPosition < e.position &&  position >= e.position ){

      e.callback( true , position , position - oldPosition  );

    }


  }


  for( var i = 0; i < this.smoothedEvents.length; i++ ){

    var e = this.smoothedEvents[i];
    if( position < e.start && position >= e.end ){

      var val = (position - e.start) / (e.end - e.start);

      e.callback( val , position , position - oldPosition );

    }

  }


  for( var i = 0; i < this.scrollEvents.length; i++ ){
      var e = this.scrollEvents[i];

      e.callback( position - oldPosition );
  }

}

