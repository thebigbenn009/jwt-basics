const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new CustomAPIError("Please provide a username or password", 400);
  }
  //just for practie, normally ptovided by the database
  const id = new Date().getDate();
  //try to keep payload small. it is a better experience for the user.
  //just for demo. In production, use long, complex and unguessable string value.
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};
module.exports = {
  login,
  dashboard,
};
