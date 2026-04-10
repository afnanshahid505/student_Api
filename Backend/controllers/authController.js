const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
const signupTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  const existingTeacher = await Teacher.findOne({ email });

  if (existingTeacher) {
    return res.status(400).json({
      message: "Teacher already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const teacher = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Signup successful",
    teacher,
  });
};

// LOGIN
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return res.status(404).json({
      message: "Teacher not found",
    });
  }

  const isMatch = await bcrypt.compare(password, teacher.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { teacherId: teacher._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
  });
};

module.exports = {
  signupTeacher,
  loginTeacher,
};