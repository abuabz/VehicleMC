const express = require('express');
const mongoose = require('mongoose');
const { getIpAddress } = require('./controllers/staticFunctions/network');
require('dotenv').config();
const app = express();
const port = process.env.PORT||3003; // You can choose any available port


app.use('/uploads',(req,res,next)=>{
    console.log('next calling')
    next();
},express.static('uploads'));


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/homePage.html')
});

app.post(
    '/uploadImage',
    (req,res)=>{

        res.redirect('/')
    }
)

const uri = process.env.MONGO_DB_STRING
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
