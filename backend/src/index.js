const express = require("express");
const connectDb = require("./config");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api/auth", authRoute);

const port = process.env.PORT || 4000;

app.listen(3000, async () => {
  await connectDb();
  console.log("Server is running");
});
