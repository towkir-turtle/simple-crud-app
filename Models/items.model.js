const mongoose = require('mongoose');
const {Schema} = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    minlength: 1,
    maxlength: 100,
  },

  description: {
    type: String,
    required: [true],
    maxlength: 500,
  },

  price: {
    type: Number,
    required: [true],
    default: 0,
  },

  category: {
    type: String,
    required: [true, 'Item category is required'],
    minlength: 3,
    maxlength: 50
  },

  inStock: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  tags: {
    type: [String],
    validate: {
      validator: function(tags) {
        return tags.length <= 5;
      },
      message: 'A product cannot have more than 5 tags'
    },
  },

  manufacturer: {
    name: String,
    country: String,
  },
})

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;