const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// signup user
const signupUser = async (req, res) => {
  try {
    const { username, email, password, city } = req.body;

    if (!username || !email || !password || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      city,
    });
    await newUser.save();

    console.log(newUser);

    if (newUser) {
      res.status(201).json({
        message: "user registration successful!",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          city: newUser.city,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error creating user" });
    console.log(error);
  }
};

// signin user
const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    console.log(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, "jwtsecret", {
      expiresIn: "30d",
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      city: user.city,
      token,
    });
  } catch (error) {
    res.status(500).send({ message: "Error signing in" });
    console.log(error);
  }
};

const verifyUser = async (req, res) => {
  try {
    // If token is valid, send user details back
    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { signupUser, signinUser, verifyUser };
