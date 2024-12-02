const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sizes: [
        {
            size: {
                type: String,
                enum: ["S", "M", "L", "XL"], 
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
});

module.exports = mongoose.model("Product", productSchema);
