const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    offer: {
        type: Number,
    },
    productPictures: [
        {img: { type: String }}
    ],
    weight: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reviews: [
        {
            userId:{ type:mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required:true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required:true },
    tags: [
        {
            tagsId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags', required:true }
        }  
    ],
    varients: [
        {
            option: {type: String},
            value:[{type:String}]
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    updatedAt: Date, 


}, { timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);