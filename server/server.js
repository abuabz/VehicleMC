const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import cors module
const Documents = require('./models/documents');
const app = express();
require('dotenv').config();
app.use(cors());

const port = process.env.PORT || 3003; // You can choose any available port

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Set unique filenames
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

app.use('/imageRaead', express.static('uploads'))

// Define a route for handling file uploads
app.post('/api/document', upload.single('vehicleImg'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    console.log(req.body)
    const { vehicleName, vehicleBrand, vehicleModel, vehicleNo, insuranceDate, PCCDate } = req.body
    const vehicleImg = `/uploads/${req.file.filename}`;

    const newDoc = new Documents({
      vehicleName, vehicleBrand, vehicleModel, vehicleNo, insuranceDate, PCCDate, vehicleImg
    });

    await newDoc.save()
    res.status(200).json({success:true, message: 'success' });
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false,message:'error uploading data'})
  }

});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/homePage.html')
});


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
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
