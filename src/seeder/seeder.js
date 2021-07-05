
const { upsertObject } = require('../connection/con');
const { gameVariable } = require('./gameData');
const { DBDocType } = require('../configuration/constants');
class GameConfig{

    /**
     * static data of game
     * @param {Request} req 
     * @param {response} res 
     */
    seedGameObject(){
        console.log(gameVariable);
        const docType = DBDocType.GAME;
        const createdAt = Date.now();
        console.log(docType);
        gameVariable.docType = docType ;
        gameVariable.createdAt = createdAt ;
        gameVariable.deletedAt = 0;
        gameVariable.updateAt = 0;
        upsertObject(gameVariable.gameName,gameVariable).then((result) =>{
            console.log("Myjackpot game seeded Successfully");
        }).catch(err => {
            console.log("error :" + err);
        });
    
    }
}


const seeder = new GameConfig();
seeder.seedGameObject();