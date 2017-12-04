function BufferedAudio( buffer , ctx , output , looping){

  this.buffer = buffer;
  this.ctx = ctx;
  this.output = output;
  this.looping  = looping;

  this.playing = false;

  this.createSource();


}

BufferedAudio.prototype.createSource = function() {

  this.source = this.ctx.createBufferSource();
  this.source.loop = this.looping || false;

  //this.source.playbackRate = .1;

  this.source.connect( this.output )


};


BufferedAudio.prototype.play = function( buffer , rate ){

    if( buffer ){ this.buffer = buffer; }
    this.source.buffer = this.buffer;
    if( rate ){ this.source.playbackRate.value = rate }
  
    this.playing = true;

    this.source.start(0);
    this.createSource();

    // Recreates source for next time we play;
    

}

BufferedAudio.prototype.stop = function(){
  
  this.playing = false;

  this.source.stop();

}






