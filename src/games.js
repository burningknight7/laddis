exports.addGame = addGame;
exports.addPlayer = addPlayer;
exports.addTeams = addTeams;
exports.addMatch = addMatch;

async function addGame(client, gamePin, playerId) {
    
   const games = client.db("laddis").collection("games");
   
   let result = null;

   games.findOne({
       gamepin: gamePin,
       over : false
   }).then((document) => {
       result = document;
   }).catch((error) => {
       console.log(error);
   });
   
   if(result != null) {
       throw 'Game with this Pin already going on';
   }

    result = await games.insertOne(
       {
           gamepin: gamePin,
           matches: [],
           players: [playerId],
           teams : null,
           result: null,
           over: false
       }
   );

   if(result) {
       return true;
   }
   return false;
}

async function addPlayer(client, gamePin, playerId) {

    let result = null;

    const games = client.db("laddis").collection("games");

    result = await games.findOne({
        gamepin : gamePin, 
        over : false
    });

    if(result && result.players && result.players.length >= 4) {
            throw 'Max players reached';
    }
    else if(result == null) {
        throw 'No such game going on';
    }

    result = await games.findOneAndUpdate(
        { gamepin : gamePin, over : false },
        { $addToSet : { players : playerId } }
    );
    
    if(result) {
        return true;
    }

    return false;
}

async function addTeams(client, gamePin, teams) {
    let result = null;
    const games = client.db('laddis').collection('games');
    result = await games.findOneAndUpdate({
        gamepin : gamePin, 
        over : false, 
        teams : null
    },
    {
        $set : { teams : teams }
    });
    return result.lastErrorObject.updatedExisting;
}

async function addMatch(client, gamePin, cards) {
    let result = null;
    const games = client.db('laddis').collection('games');
    const initBet = { vakkhai : -1, value : 0};
    const initRound = { cards : [null, null, null, null], winner : null}
    const initPlay = {bet : [ initBet, initBet, initBet, initBet] , winner : null};
    let match = 
                {
                    'cards' : cards, 
                    'bets' : initPlay,
                    'round1' : initRound, 
                    'round2' : initRound, 
                    'round3' : initRound, 
                    'round4' : initRound,
                    'winner' : null
                };          
    result = await games.findOneAndUpdate({
        gamepin : gamePin, 
        over : false, 
        teams : { $ne : null}
    },
    {
        $push : { matches : match}
    });
    return result.lastErrorObject.updatedExisting;
}

async function setBet(client, gamePin, index, bet) {
    const games = client.db('laddis').collection('games');
    let { matches } = await games.findOne({
        gamepin: gamePin, 
        over : false, 
        teams : { $ne : null}
    });
    if(matches && matches.length > 0 && matches[matches.length - 1].bets == null) {
        console.log("hello world boii");
    }
    return false;
}

