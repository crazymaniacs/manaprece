const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  categoryId: { type: String },
});

mongoose.model('product', ProductSchema);
