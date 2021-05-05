const { italic } = require('ansi-colors');
var gamesdb = require('../src/games.js');
var assert = require('assert')
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://tanay710:TTvkjb710@cluster0.npp0a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const gamePin = 3123;

describe('Array' , () => {
    describe('#indexOf' , () => {
        it('should return -1 when not found', () => {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('Add', () => {
    describe('Game' , () => {

        before((done) => {
            client.connect().then((message) => {
                client.db("laddis").collection("games").deleteMany({}).then((resolve) => {
                    done();
                }).catch((error) => {
                    throw error;
                });
            });
        });

        it('should add a game successfully', async () => {
            let playerId = "player1";
            let result = await gamesdb.addGame(client, gamePin, playerId);
            assert.strictEqual(result, true);
        });

        it('should add a new player to a game successfully', (done) => {
            let playerId = "player2";
            gamesdb.addPlayer(client, gamePin, playerId).then(
                (result) => {
                    assert.strictEqual(result, true);
                    done();
                }
            ).catch((error) => {
                assert.fail();
            });
        });

        it('should throw an error', (done) => {
            let playerId = "player2";
            let result = 1;
            gamesdb.addPlayer(client, gamePin, playerId).then(
                (document) => {
                    if(document != null) {
                        assert.fail();
                    }
                    done();
                }
            ).catch((error) => {
                result = 2;
                assert.strictEqual(result, 2);
                done();
            });
        });

        it('should throw an errror when max players reach more than 4', async () => {
            let result = await client.db('laddis').collection('games').findOneAndUpdate(
                {gamepin : gamePin, over: false},
                { $push : { players : { $each : ['player3' , 'player4'] } } }
            );
            assert.notStrictEqual(result, null);
            let goterror = false;
            try {
            result = await gamesdb.addPlayer(client, gamePin , 'player5');
            }catch(error) {
                assert.strictEqual(error, 'Max players reached');
                goterror = true;
            }
            assert.strictEqual(goterror, true);
        });

        it('should add a team successfully' , async () => {
            let teams = {
                'team1' : [0, 2],
                'team2' : [1, 3]
            };
            let result = await gamesdb.addTeams(client, gamePin, teams);
            assert.strictEqual(result, true);
        });

        it('should not change a team' , async () => {
            let teams = {
                'team1' : [0, 3],
                'team2' : [1, 2]
            };
            let result = await gamesdb.addTeams(client, gamePin, teams);
            assert.strictEqual(result, false);
        });

        it('should add the a match correctly', async () => {
            let cards = []
            for(let i = 0; i < 16; i++) {
                cards.push('Card '+(i+1));
            }
            let match = 
                {
                    'cards' : cards, 
                    'bets' : null,
                    'round1' : null, 
                    'round2' : null, 
                    'round3' : null, 
                    'round4' : null,
                    'winner' : null
                };
            let result = await gamesdb.addMatch(client, gamePin, match);
            assert.strictEqual(result, true);
        });
    });
});

client.close();