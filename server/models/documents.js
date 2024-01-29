const mongoose = require('mongoose');

const M01_documentsFields={
    vehicleName:'vehicleName',
    vehicleBrand:'vehicleBrand',
    vehicleModel:'vehicleModel',
    vehicleNo:'vehicleNo',
    insuranceDate:'insuranceDate',
    PCCDate:'PCCDate',
    vehicleImg:'vehicleImg'
}

// Define the user schema
const documents = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
    // unique: true,
  },
  vehicleBrand: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    // enum: ['admin', 'regular'], // Example user types, customize as needed
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  insuranceDate: {
    type: String,
    required: true,
  },
  PCCDate: {    //polution
    type: String,
    required: true,
  },
  // vehicleImg: {    //polution
  //   type: String,
  //   required: true,
  // },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
});

// Create a User model using the documents
const Documents = mongoose.model('M01_documents', documents);

module.exports = Documents;
