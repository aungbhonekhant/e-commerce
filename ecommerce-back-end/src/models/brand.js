const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({

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
    active: {
        type: Boolean,
        default: true,
    },
    brandImage: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);