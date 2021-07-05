const { getObject , upsertObject} = require('../connection/con');
const { gameService} = require('../service/gameService');
const { falshMessage } = require('../dispatcher/responseDispatcher')

class Game{

    gameSpin =(req,res) => {
        getObject("Extreme7").then((gameData) =>{
            getObject("user-data").then((userData) =>{
                let { chips , currentBet } = userData.content;
                //generateView Zone
                const gameViewZone = gameService.generateViewZone(gameData.content);
                const viewZone = gameViewZone.viewZone;

                //convert viewZone in reel X column
                const matrixOfReelXcol = gameService.matrix(gameViewZone,gameData.content.viewZone.rows , gameData.content.viewZone.columns);

                
                // in viewZonecheck payline available 
                let checkPayline = gameService.checkPayline(gameData.content.payarray,matrixOfReelXcol,userData.content,gameData.content.payTable);
                let result =checkPayline.result;
                chips = checkPayline.chips - currentBet;


                console.log(chips);

                userData.content.chips = chips;
                userData.content.currentBet = currentBet;
                upsertObject('user-data',userData.content).then(()=>{
                    let data = {
                        viewZone  : viewZone,
                        result    : result,
                        currentBet : checkPayline.currentBet,
                        totalBet : currentBet, 
                        chips    : chips,
                        currentPayLines : checkPayline.currentPayLines,
                        TotalWin : checkPayline.winAmount
                    }
                    const response = falshMessage.resDispatch(res,'OK',data);
                })
                
            })
        })
    };
}
const gameLogic = new Game();
module.exports.game= gameLogic;