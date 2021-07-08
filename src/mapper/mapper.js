class Mapper {
    gameClickMapper= (gameData,userData) =>{
        const GameClickData ={
            game:{
                gameName : gameData.gameName,
                viewZone : gameData.viewZone,
                payarray : gameData.payarray,
                payTable : gameData.payTable,
                symbols : gameData.symbols,
                reels : gameData.reels,          
            },
            user :{
                currentBet : userData.currentBet,
                totalBet : userData.totalBet,
                chips  : userData.chips,
                currentPayLines : userData.currentPayLines
            }
        }
        return GameClickData;
    }
}
const mapper = new Mapper();
module.exports.mapper = mapper;