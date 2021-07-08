const { RES_MESSAGES ,HTTP_STATUS } = require('./message.json');

class Dispatcher{
    /**
     * This function dispatches api responses
     * @param {response} res send response
     * @param {message} message message_code
     * @param {data} data response data
     * @returns true
     */
    resDispatch(res,message,data){
        let jsonResponse ={
            "isError" : false,
            "message" : RES_MESSAGES[`${message}`],
            "data" : data
        }
        res.writeHead(HTTP_STATUS.OK, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(jsonResponse));
        res.end();
    }

    /**
     * this function use to NOT_FOUND data
     * @param {response} res 
     * @param {message} message 
     * @returns 
     */
    resDispatchNotFound(res,message){
        let jsonResponse ={
            "isError" : true,
            "message" : RES_MESSAGES[`${message}`],
            "data" : {}
        }
        res.writeHead(HTTP_STATUS.NOT_FOUND, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(jsonResponse));
        res.end();
    }

    /**
     * this function send proper response 
     * @param {response} res 
     * @param {data} jsonData 
     * @returns 
     */
    resDispatchError(res,jsonResponse){
        res.writeHead(HTTP_STATUS.NOT_FOUND, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(jsonResponse));
        res.end();
    }

}

const resDispatch = new Dispatcher();
module.exports.flashMessage = resDispatch;