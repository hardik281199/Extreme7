const { getObject , upsertObject} = require('../connection/con');
const { gameService} = require('../service/gameService');
const { flashMessage } = require('../dispatcher/responseDispatcher')

class Game{

    /**
     * this function send proper response to user and
     * either in viewZone pay to use then counting chips and give win 
     * @param {Request} req 
     * @param {response} res 
     */
    gameSpin =(req,res) => {
        const userId = req.body.userId;
        const bet = req.body.totalBet;
        getObject("extreme7").then((gameData) =>{
            getObject(userId).then((userData) =>{
                let { chips , currentBet , totalBet } = userData.content;
                //generateView Zone
                const gameViewZone = gameService.generateViewZone(gameData.content);
                const viewZone = gameViewZone.viewZone;

                //convert viewZone in reel X column
                const matrixOfReelXcol = gameService.matrix(gameViewZone,gameData.content.viewZone.rows , gameData.content.viewZone.columns);

                
                // in viewZonecheck payline available 
                let checkPayline = gameService.checkPayline(gameData.content.payarray,matrixOfReelXcol,userData.content,gameData.content.payTable,bet);
                let result =checkPayline.result;
                chips = checkPayline.chips - bet;
                // update user-data
                userData.content.chips = chips;
                userData.content.totalBet = bet;
                userData.content.currentBet = checkPayline.currentBet;
                upsertObject(userId,userData.content).then(()=>{
                    let data = {
                        viewZone  : viewZone,
                        result    : result,
                        currentBet : checkPayline.currentBet,
                        totalBet : bet, 
                        chips    : chips,
                        currentPayLines : checkPayline.currentPayLines,
                        TotalWin : checkPayline.winAmount
                    }
                    flashMessage.resDispatch(res,'OK',data);
                })
            })
        }).catch((err)=>{
            return flashMessage.resDispatchError(res, {
                "isError" : false,
                "message" : err.message,
                "data" : {}
            });
            //flashMessage.resDispatchNotFound(res,'NOT_GAME_EXISTS')
        })
    };
}
const gameLogic = new Game();
module.exports.game= gameLogic;