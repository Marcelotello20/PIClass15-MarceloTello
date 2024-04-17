import mongoose from 'mongoose';

const productCollection = "products";

const productSchema = mongoose.Schema({
  
  title: {
    type:String,
    require: true
  },
  code: { 
    type: String, 
    unique: true 
  },
  description: {
    type:String,
    require: true
  },
  category: {
    type:String,
    require: true
  },
  price: {
    type:Number,
    require: true
  },
  thumbnail: {
    type:Array,
    require: false,
    default: []
  },
  stock: {
    type:Number,
    require: true
  },
  status: {
    type:Boolean,
    require: false,
    default:true
  }
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;