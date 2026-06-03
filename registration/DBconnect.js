// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

// Database Connection URL
const uri = "mongodb+srv://officialmengkheangseng_db_user:RsrGJNgplw9ceMcY@task.ycxwppk.mongodb.net/?appName=Task";
// const uri = "mongodb://officialmengkheangseng_db_user:RsrGJNgplw9ceMcY@ac-5ukt5sn-shard-00-00.ylaq8iw.mongodb.net:27017,ac-5ukt5sn-shard-00-01.ylaq8iw.mongodb.net:27017,ac-5ukt5sn-shard-00-02.ylaq8iw.mongodb.net:27017/aupp?ssl=true&replicaSet=atlas-3ddn06-shard-0&authSource=admin&appName=Task2";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    // STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
  }
}
run().catch(console.dir);

// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = mongoose;