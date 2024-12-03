const Product = require("../models/Products")
const Team = require("../models/Teams")

const AddProduct = async (req, res) =>{
    try {
      const { name, price, description, image, sizes, teamId } = req.body;

      // Create the new product
      const newProduct = new Product({
        name,
        price,
        description,
        image,
        sizes,
        teamId,
      });

      const savedProduct = await newProduct.save();

        await Team.findByIdAndUpdate(
          teamId,
          { $push: { products: savedProduct._id } },
          { new: true, useFindAndModify: false }
        );

        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const getProducts = async(req, res) =>{
 const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    // Find team based on city name and populate products
    const team = await Team.findOne({ name: city }).populate("products");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { AddProduct, getProducts}; 