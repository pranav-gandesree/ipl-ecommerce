const Product = require("../models/Products")
const Team = require("../models/Teams")

const AddProduct = async (req, res) =>{
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const getProducts = async(req, res) =>{
    try {
        const teams = await Team.find().populate("products");
        res.status(200).json(teams);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports = { AddProduct, getProducts}; 