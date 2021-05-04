exports.addGame = addGame;
exports.addPlayer = addPlayer;

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
           matches: null,
           players: [playerId],
           matches: null,
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

