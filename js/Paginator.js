function Paginator(){
  
  this.currentPage = 0
  this.pages = [
    0,
    -1,
    -2,
    -3,
    -4,
    -5.5,
    -7,
    -10,
    -11,
    -11.9,
    -13.4,
    -14.75,
    -27,
    -90,
    -107.83,
    -109,
    -110,
    -136,
    -137,
    -138,
    -140.5,
    -155,
  ];



  /*document.getElementById("pageUp").addEventListener('click', function (event) {
            this.pageUp();
        }.bind( this ));

  document.getElementById("pageDown").addEventListener('click', function (event) {
            this.pageDown();
        }.bind( this ));*/

}


Paginator.prototype.update = function(){

  for( var i = 0; i < this.pages.length; i++){
    if( controls.position <= this.pages[i] && controls.oldPosition > this.pages[i]){
      this.currentPage = i;
      //controls.speed = 0;
    }

    if( controls.position >= this.pages[i] && controls.oldPosition < this.pages[i]){
      this.currentPage = i;
      //controls.speed = 0;
    }
  }


  for( var i = 0; i < this.pages.length; i++){
    if( Math.abs( controls.position - this.pages[i] ) < 1 ){
      controls.dampening = .1
    }else{
      controls.dampening = .95
    }
  }

}


Paginator.prototype.setPageLocation = function(id){
  SP( this.pages[id] );
}

Paginator.prototype.pageUp = function(){
  this.currentPage -= 1;
  if( this.currentPage < 0){ this.currentPage = 0 }
  this.setPageLocation( this.currentPage );
}

Paginator.prototype.pageDown = function(){
  this.currentPage += 1;
  if( this.currentPage >= this.pages.length ){ this.currentPage = this.pages.length -1; }
  this.setPageLocation( this.currentPage );
}



