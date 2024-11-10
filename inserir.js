const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

let MONGODB_URL = process.env.MONGO_CONNECTION_URL;
let MONGO_DB = process.env.MONGO_DB;
let MONGO_COLLECTION = process.env.MONGO_COLLECTION;

const DBClient = new MongoClient(MONGODB_URL);
const DB = DBClient.db(MONGO_DB);
const processCollection = DB.collection(MONGO_COLLECTION);

// Função para inserir um documento
async function insertData(data) {
    try {
        await DBClient.connect();
        await processCollection.insertOne(data)
            .then((results) => {
                console.log(`Inserido com sucesso: ${results.acknowledged}`);
            })
    } catch (error) {
        console.error('Erro ao inserir no MongoDB:', error);
    } finally {
        await DBClient.close();
    }
}


// Execução das funções
async function run() {
    const newData = {
        nome: 'Thamyres Tatiana Bessa',
    };
    await insertData(newData);
}

run();
