const {MongoClient} = require('mongodb');

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://tanay710:TTvkjb710@cluster0.npp0a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        const newListing = {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        };

        await createListing(client, newListing);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

//main().catch(console.error);