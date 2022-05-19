console.log('Aluno: Leonardo Castro');

const { MongoClient } = require('mongodb');

async function main() {
   const uri =
      'mongodb://dswa5:dswa5@clusterleonardo-shard-00-00.3fhkc.mongodb.net:27017,clusterleonardo-shard-00-01.3fhkc.mongodb.net:27017,clusterleonardo-shard-00-02.3fhkc.mongodb.net:27017/?ssl=true&replicaSet=atlas-4go5n9-shard-0&authSource=admin&retryWrites=true&w=majority';

   const client = new MongoClient(uri);

   try {
      await client.connect();
      console.log('Servidor Conectado!');
      const database = client.db('ifsp');

      const contatos = database.collection('contatos');

      const findResult = await contatos.find({}).toArray();
      console.log('Foram encontrados os seguintes docs:');
      console.log(findResult);
   } catch (e) {
      console.error(e);
   } finally {
      await client.close();
   }
}
main().catch(console.error);
