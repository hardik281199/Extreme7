module.exports = {

    /**
	* Response Messages
	*/
    RES_MESSAGES: {
        OK: 'OK',
        NOT_FOUND: 'Requested resource not found on server,please try again',
        SUCCESS :'You have been store successfully',
        UNSUCCESS :'You not store data,please try again',
        NOT_GAME_EXISTS : 'this game not exist'
    },

    //this HTTP_STATUS use when send response then use this data.
    HTTP_STATUS: {
        OK: 200,
        NOT_FOUND: 422
    },
}