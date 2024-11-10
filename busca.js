const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

let MONGODB_URL = process.env.MONGO_CONNECTION_URL;
let MONGO_DB = process.env.MONGO_DB;
let MONGO_COLLECTION = process.env.MONGO_COLLECTION;

const DBClient = new MongoClient(MONGODB_URL);
const DB = DBClient.db(MONGO_DB);
const processCollection = DB.collection(MONGO_COLLECTION);

let find = { '_id': new ObjectId("672ffa48ab6bfdf734822a46") };

async function run() {
    try {
        await DBClient.connect();

        const findResult = await processCollection.find(find).toArray();

        const results = findResult.map(process => ({
            nome: process.nome,
        }));

        console.log(results);
    } catch (error) {
        console.error('Erro ao buscar no MongoDB:', error);
    } finally {
        await DBClient.close();
    }
}

run().catch(console.dir);
