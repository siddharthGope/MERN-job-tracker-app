const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const verifyToken = require("./middleware/auth");
const jobRoutes = require("./routes/jobs");

const app = express();
const PORT = process.env.PORT || 6200;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const JWT_SECRET_KEY = process.env.JWT_SECRET || "12345abcde";

app.use(express.json());
app.use("/jobs", jobRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const registeredUsers = [];

//Routes

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Invalid username/password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, hashedPassword, id: Date.now() };
    registeredUsers.push(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userFound = registeredUsers.find((user) => user.username === username);
  if (
    !userFound ||
    !(await bcrypt.compare(password, userFound.hashedPassword))
  ) {
    return res.status(401).json({ message: "password or username invalid" });
  }

  const token = jwt.sign({ username: userFound.username }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return res.status(200).json({ token, message: "Login successful" });
});

app.get("/users", verifyToken, (req, res) => {
  const safeUser = registeredUsers.map((user) => ({
    username: user.username,
  }));

  res.json({ users: safeUser });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port http://localhost:${PORT}`);
});
