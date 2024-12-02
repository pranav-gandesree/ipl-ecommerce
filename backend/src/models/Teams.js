const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true
    },
    colors: {
        primary: {
            type: String,
            required: true
        },
        secondary: {
            type: String,
            required: true
        },
    },
    description: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

module.exports = mongoose.model("Team", teamSchema);
