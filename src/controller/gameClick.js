const { getObject , upsertObject} = require('../connection/con');
const { flashMessage } = require('../dispatcher/responseDispatcher');
const { mapper } = require('../mapper/mapper');  

class GameClick{

    /**
     * when click on game then this function call
     * this function use to send game data 
     * @param {Request} req 
     * @param {Response} res 
     */
    gameClick =(req,res) =>{
        const uuid = req.body.userId;
        getObject("extreme7").then((gameData) =>{
            getObject(uuid).then((userData) =>{
                const GameClickMapper = mapper.gameClickMapper(gameData.content,userData.content);
                flashMessage.resDispatch(res,'OK',GameClickMapper);
            })
        })              
    }
}
const gameData = new GameClick();
module.exports.gameClickData = gameData;