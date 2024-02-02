const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import cors module
const {Documents,M01_documentsFields} = require('./models/documents');
const { getValuesFromJson } = require('./controllers/staticFunctions');
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

app.use('/imageRead', express.static('uploads'))

// Define a route for handling file uploads
app.post('/api/document',
  upload.single('vehicleImg'),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      const vehicleImglocation = `/uploads/`;
      const vehicleImgname = req.file.filename
      console.log(`${process.env.IMGAGE_STR}/${vehicleImgname}`)

      const fields = {...M01_documentsFields};
      delete fields.vehicleImgName;
      delete fields.vehicleImgPath;
      let data =  getValuesFromJson(req.body,fields)
      if(data === false){
        const err = new Error('Some data is missing')
        err.msg = 'Some data is missing'
        throw err
      }
      data[M01_documentsFields.vehicleImgName] = vehicleImgname;
      data[M01_documentsFields.vehicleImgPath] = vehicleImglocation;

      // console.log(data)
      

      const newDoc = new Documents(data);

      await newDoc.save()
      res.status(200).json({ success: true, message: 'Added document' });
    } catch (error) {
      console.log(error)
      if(error.code === 11000){

        return res.status(400).json({ success: false, message: 'Duplicate Document' })
      }
      if(error.msg){

        return res.status(400).json({ success: false, message: error.msg})
      }
      
      return res.status(400).json({ success: false, message: 'error uploading data' })
    }

  });

app.get('/api/documents',async (req,res)=>{
  try {
    // Use await with the .find() method to retrieve all documents
    const data = await Documents.find({});

    // console.log(data)
    res.status(200).json({
      success:true,
      data,
      message:'success'
    })
    
  } catch (error) {
    console.error('Error while reading data:', error);
    res.status(400).json({success:false,message:'Error reading data'})
  }
})

app.delete('/api/document/:id',async (req,res)=>{
  try {
    // Use await with the .find() method to retrieve all documents
    const resourceId = req.params.id;
    const data = await Documents.findByIdAndDelete(resourceId);
    
    // console.log(data)
    if(data){
      res.status(200).json({
        success:true,
        data,
        message:`${data.vehicleName} deleted successfully`
      })
    }else{
      throw new Error('no record found' )
    }
    
  } catch (error) {
    console.log('Error while reading data:', error);
    res.status(400).json({success:false,message:error.message||'Error reading data'})
  }
})

app.put('/api/document/:id',upload.single('vehicleImg'),async (req,res)=>{
  try {
    // Use await with the .find() method to retrieve all documents
    const resourceId = req.params.id;
    const { vehicleName, vehicleBrand, vehicleModel, vehicleNo, insuranceDate, PCCDate } = req.body

    const updateData = {
      vehicleName, vehicleBrand, vehicleModel, vehicleNo, insuranceDate, PCCDate
    }

    const data = await Documents.findByIdAndUpdate(resourceId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators on update
    });

    // console.log(data)
    res.status(200).json({
      success:true,
      data,
      message:'success'
    })
    
  } catch (error) {
    console.error('Error while updating data:', error);
    res.status(400).json({success:false,message:'Error updating data'})
  }
})

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
