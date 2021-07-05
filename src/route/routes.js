const { game } = require('../controller/game')

module.exports = (router) => {
    
    router.post('/spin',game.gameSpin);
}