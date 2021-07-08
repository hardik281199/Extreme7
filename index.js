const dotenv = require('dotenv');
const http = require('http');

const Router = require('router');
const bodyparser = require('body-parser');
const finalhandler = require('finalhandler');
dotenv.config();
const router = new Router();
const server = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res));
});
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
  extended: false
}));    

require('./src/route/routes')(router);
server.listen(process.env.PORT,() => console.log(`Exapress server is runing at port no :${process.env.PORT}`));
/**
 * Seed Extreme7 game in database
 */
// const { seeder } = require('./src/seeder/seeder');
// //seeder.seedGameObject();
// seeder.seedUserObject();

module.exports = router;