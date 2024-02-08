const mongoose = require('mongoose');

const M01_documentsFields = {
  vehicleName: 'vehicleName',
  vehicleBrand: 'vehicleBrand',
  vehicleModel: 'vehicleModel',
  vehicleNo: 'vehicleNo',
  insuranceDate: 'insuranceDate',
  PCCDate: 'PCCDate',
  vehicleImgName: 'vehicleImgName',
  vehicleImgPath:'vehicleImgPath',
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
    unique: true,
    index: true
  },
  insuranceDate: {
    type: String,
    required: true,
  },
  PCCDate: {    //polution
    type: String,
    required: true,
  },
  vehicleImgName: {    
    type: String,
    required: true,
  },
  vehicleImgPath: {    
    type: String,
    required: true,
  },
  
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   updatedAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
},{
  virtuals:{
    vehicleUrl:{
      get(){
        return `${process.env.IMGAGE_STR}/${this.vehicleImgName}`
      }
    }
  }
});
documents.set('toObject',{virtuals:true})
documents.set('toJSON',{virtuals:true})

// Create a User model using the documents
const Documents = mongoose.model('M01_documents', documents);

module.exports = { Documents, M01_documentsFields };
