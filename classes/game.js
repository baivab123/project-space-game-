class Game{
    constructor(){
        this.reset = createButton("Reset");
    }
    readGameState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>{
            gameStateValue = data.val()
        });
    }
    start(){
        playerObj = new Player();
        playerObj.readPlayerCount();

        player = createSprite(50,150);
        player.addImage("player",playerImg);
        player.scale = 0.06;

        enemy = createSprite(450,150);
        enemy.addImage("enemy",enemyImg);
        enemy.scale = 0.3;

        playersArray = [player,enemy];       
    }
    update(state){
     database.ref("/").update({
         gameState : state
     })   
    }
    handleElements(){
        this.reset.position(width-60,10);
        formObj.hide();
    }
    handleResetButton(){
        this.reset.mousePressed(()=>{
            database.ref("/").update({
                gameState : 0,
                playerCount : 0 , 
                players : [] 
            })
            window.location.reload();
        })
    }
    handlePlayerControls(){
        if(keyIsDown(UP_ARROW)){ 
            playerObj.positionY = playerObj.positionY-10;
            playerObj.update();
        }
        if(keyIsDown(DOWN_ARROW)){ 
            playerObj.positionY = playerObj.positionY+10;
            playerObj.update();
        }
        
    }
    play(){
        this.handleElements();
        this.handleResetButton();
        Player.getPlayerInfo();
        if(allPlayers !== undefined){
            var index  = 0;
            for(var plr in allPlayers ){
                index = index + 1;
                var y = allPlayers[plr].positionY;
                playersArray[index-1].position.y = y;
            }
            this.handlePlayerControls();
            drawSprites();
        }
    }

}