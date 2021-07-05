module.exports.gameVariable ={

    gameName: "Extreme7",
    viewZone: {
        "rows": 3,
        "columns": 3
    },
    payarray: [[0,0,0],[1,1,1],[ 2,2,2],[0,1,2],[2,1,0]],
    payTable:{"3Diamonds": {
                "3ofakind": 1500
                },
                "Diamonds": {
                "3ofakind": 500
                },
                "3Seven": {
                "3ofakind": 90
                },
                "Seven": {
                "3ofakind": 80
                },
                "3Bar": {
                "3ofakind": 60
                },
                "Bar": {
                "3ofakind": 50
                }
            },
    arrayOfReel: [["3Diamonds","Diamonds","3Seven","3Diamonds","Seven","Seven","3Bar","Bar","3Seven","Bar"],
                    ["Seven","3Bar","3Seven","3Diamonds","Bar","3Diamonds","Diamonds","Bar","Seven","Bar"],
                    ["3Diamonds","3Bar","3Seven","Bar","3Diamonds","Diamonds","Bar","3Bar","Seven","Seven"]]
}