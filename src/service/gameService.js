class GameService{

    /**
     * this function use to random and this random number will be generate viewZone.
     * @param {low} low 
     * @param {high} high 
     * @returns 
     */
    randomInt = (low, high) =>{ 
        const element = Math.floor(Math.random() * (high - low + 1) + low);
        return element
    }
    
    /**
     * It returns particular symbol at requested reel & column index from reel configuration
     * @param {randomArr} randomArr random array
     * @param {reelLength} reelLength length of random array
     * @param {reel} reel number of reel
     * @param {col} col number of col
     * @returns symbole of array ex :[h1+1,h2+1,h3+3,h4+4,h5+5]
     */
     getSymbol = (randomArr,arrayOfReel ,reelLength, reel, col) =>{
        let symbol = arrayOfReel[(randomArr[reel] + col) % reelLength];
        return symbol;
    }

    /**
     * this funtion generate ViewZone and send propre viewZone in reel
     * @param {gameData} gameData 
     */
    generateViewZone =(gameData) =>{
        const arrayOfReel =gameData.arrayOfReel;
        const row =gameData.viewZone.rows;
        const colume = gameData.viewZone.columns;
        const randomNumber =[];
        for (let index = 0; index < colume; index++) {
            const element = this.randomInt(0,arrayOfReel[index].length);
            randomNumber.push(element);
        }

        /**
         * prepared json reel of viewZone
         */
         const viewZone = {
            reel0: [],
            reel1: [],
            reel2: []
        }; 
        let generatedArray = [];
        //create view zone
        for(let reel = 0;reel < colume;reel++){
            let symbolArray = [];
            for(let col = 0; col< row; col++) {
                const symbol = this.getSymbol(randomNumber,arrayOfReel[reel],arrayOfReel[reel].length, reel, col);
                symbolArray.push(symbol);
            }
            viewZone[`reel${reel}`].push(...symbolArray);
            generatedArray.push(viewZone[`reel${reel}`]);   
        }
        return {"generatedArray" : generatedArray,"viewZone" :  viewZone}
    }

    /**
     * this function convert viewZone in matrix reel X colume
     * @param {generateViewZone} generateViewZone 
     * @param {row} row 
     * @param {colume} colume 
     * @returns 
     */
    matrix = (generateViewZone,row,colume) => {
        let matrixReelXCol = [];
        for (let matrixCol = 0; matrixCol < row; matrixCol++) {
            let arrar = [];           
            for (let matrixRow = 0; matrixRow < colume; matrixRow++) {
                let num = generateViewZone.generatedArray[matrixRow][matrixCol];
                arrar[matrixRow] = num;
            }            
            matrixReelXCol.push(arrar);                      
        }
        return matrixReelXCol; 
    }

    /**
     * this function check if in viewZone come payline then give win and
     * count symbol and symbole kind 
     * @param {payarray} payarray 
     * @param {matrixReelXCol} matrixReelXCol 
     * @param {content} content 
     * @param {pay} pay 
     * @returns 
     */
   checkPayline = (payarray,matrixReelXCol,content,pay,bet) =>{
        const result =[];
        let winAmount = 0 ;
        let chips = content.chips;
        let currentBet = bet/ payarray.length;
        let currentPayLines = payarray.length;
        for (let rowOfMatrix = 0; rowOfMatrix < matrixReelXCol.length; rowOfMatrix++){
            for (let rowOfPayArray = 0; rowOfPayArray < payarray.length; rowOfPayArray++){ 
                let payline = payarray[rowOfPayArray];
                let countOfSym = this.countOfSymbol(matrixReelXCol,payline,rowOfMatrix);
                let count = countOfSym.count;
                let symbol = countOfSym.symbol;
                if(count>2){
                    let SymbolOfResult = this.buildPayLine(count,symbol,pay,payline,currentBet,payarray.length);
                    result.push({symbol: SymbolOfResult.symbol,wintype: SymbolOfResult.wintype,Payline: SymbolOfResult.payline,WinAmount: SymbolOfResult.WinAmount});
                    winAmount += SymbolOfResult.WinAmount;
                }
            }
        }
        chips += winAmount;
    return {result ,chips,winAmount , currentBet , currentPayLines ,}

    }

    /**
     * this function count symbole pair and send response count of same symbole in payline.
     * @param {matrixReelXCol} matrixReelXCol 
     * @param {payline} payline 
     * @param {rowOfMatrix} rowOfMatrix 
     * @returns 
     */
    countOfSymbol = (matrixReelXCol,payline,rowOfMatrix) => {
        let count = 0;
        let d = 0;
        let symbol = matrixReelXCol[rowOfMatrix][d];
        if(payline[0] === rowOfMatrix){
            count++;
            for (let element = 1; element < payline.length; element++) {
                if(symbol !== matrixReelXCol[payline[element]][element]){
                    break;
                }
                count++;
            }
        }
        return {count,symbol};
    }

    /**
     * this function call when count of symbole > 2 and 
     * count winAmount
     * @param {count} count 
     * @param {symbol} symbol 
     * @param {Pay} pay 
     * @param {payline} payline 
     * @param {currentBet} currrentBet 
     * @param {numberOfPayLine} numberOfPayLine 
     * @returns 
     */
    buildPayLine = (count,symbol,pay,payline,currrentBet,numberOfPayLine) =>{
        let multipler = pay[`${symbol}`][`${count}ofakind`];
        return {symbol,wintype: `${count}ofakind`,payline ,WinAmount : (currrentBet/numberOfPayLine )* multipler }
    }
}
const game = new GameService();
module.exports.gameService = game;