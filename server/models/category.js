const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String },
  description: { type: String },
  parentCategoryId: { type: String },
  childOnly: { type: Boolean },
});

mongoose.model('category', CategorySchema);
