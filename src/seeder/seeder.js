
const { upsertObject } = require('../connection/con');
const { gameVariable } = require('./gameData');
const { DBDocType } = require('../configuration/constants');
const { userData } = require('../seeder/userData')
class GameConfig{

    /**
     * static data of game
     */
    seedGameObject(){
        const docType = DBDocType.GAME;
        const createdAt = Date.now();
        gameVariable.docType = docType ;
        gameVariable.createdAt = createdAt ;
        gameVariable.deletedAt = 0;
        gameVariable.updateAt = 0;
        upsertObject(gameVariable.gameName,gameVariable).then((result) =>{
            console.log("Extreme7 game seeded Successfully");
        }).catch(err => {
            console.log("error :" + err);
        });

    }

    /**
     * this function seed user data
     */
    seedUserObject(){
        const uuid = "9b4b5e7e-dcfc-4aa3-8c3d-edb90ba706ec";
        const createdAt = Date.now();
        userData.createdAt = createdAt;
        upsertObject(uuid,userData).then(()=>{
            console.log("Extreme7 user data seeded Successfully");
        }).catch(err =>{
            console.log("error ==>" + err);
        });

    }
}
const gameConfigSeeder = new GameConfig();
exports.seeder= gameConfigSeeder;