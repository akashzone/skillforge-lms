const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  let { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ message: "Invalid email format, must include @" });
  }
  email = email.toLowerCase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  if (!["student", "instructor", "admin"].includes(role)) {
    return res
      .status(400)
      .json({ message: "Invalid role, must be student, instructor, or admin" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
