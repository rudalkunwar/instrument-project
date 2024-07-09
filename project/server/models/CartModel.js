const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Product=require('./ProductModel');

const cartSchema=Schema({

   user_id:{
      type:String,
      require:true,
   },
  

   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
  },

 quantity:{
    type:Number,
    require:true,
 },

 created_at:{
      type:Date,
      default:Date.now,
   },
   updated_at:{
      type:Date,
      default:Date.now,
   },
   updated_by:{
      type:String,
      default:'user',
   },
 
});

const Cart=mongoose.model('carts',cartSchema);;
module.exports= Cart;