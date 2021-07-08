const { game } = require('../controller/game');
const { gameClickData } = require('../controller/gameClick');

module.exports = (router) => {
    router.post('/spin',game.gameSpin);

    router.post('/gameClick',gameClickData.gameClick);
}