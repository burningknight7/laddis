const { italic } = require('ansi-colors');
var gamesdb = require('../src/games.js');
var assert = require('assert')
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://tanay710:TTvkjb710@cluster0.npp0a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

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
            //this.timeout(0);
            client.connect().then((message) => {
                client.db("laddis").collection("games").deleteMany({}).then((resolve) => {
                    done();
                }).catch((error) => {
                    console.log(error);
                });
            });
        });

        it('should add a game successfully', (done) => {
            const gamePin = 3123;
            const playerId = "player1";
            //assert.strictEqual(c, 2);
            gamesdb.addGame(client, gamePin, playerId).then(
                (result) => {
                    assert.strictEqual(result , true);
                    done();
                }
            );
        });

        it('should add a new player to a game successfully', (done) => {
            const gamePin = 3123;
            const playerId = "player2";
            gamesdb.addPlayer(client, gamePin, playerId).then(
                (result) => {
                    assert.strictEqual(result, true);
                    done();
                }
            );
        });

        it('should throw an error', () => {
            const gamePin = 3123;
            const playerId = "player2";
            assert.throws(async () => {
                let result = await gamesdb.addPlayer(client, gamePin, playerId);
            }, Error);
        });
    });
});

client.close();