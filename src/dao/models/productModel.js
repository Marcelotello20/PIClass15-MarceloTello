import mongoose from 'mongoose';

const productCollection = "products";

const productSchema = mongoose.Schema({
  
  title: {
    type:String,
    required: true
  },
  code: { 
    type: String, 
    unique: true 
  },
  description: {
    type:String,
    required: true
  },
  category: {
    type:String,
    required: true
  },
  price: {
    type:Number,
    required: true
  },
  thumbnail: {
    type:Array,
    required: false,
    default: []
  },
  stock: {
    type:Number,
    required: true
  },
  status: {
    type:Boolean,
    required: false,
    default:true
  }
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;