class Button{
    constructor(){
        this.Button=createButton("Play");
        this.Button.position(780,430);
        this.Button.style('background','lightgrey');

        
    }
    hide(){
        this.Button.hide();
        
    }
    display(){
    this.Button.mousePressed(()=>{
     gameState=1;
     this.Button.hide();
    });

    }
}