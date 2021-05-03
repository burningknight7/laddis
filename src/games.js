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

    games.findOne({
        gamepin : gamePin,
        over : false,
        players : {
            $in : [playerId]
        }
    }).then((document) => result = document);

    if(result) {
        throw 'Player already joined'
    }

    result = await games.findOneAndUpdate(
        { gamepin : gamePin, over : false },
        { $push : { players : playerId } }
    );
    
    if(result) {
        return true;
    }

    return false;
}

