const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../database/connection");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password  || !username) {
    return res.status(400).json({
      message: "please provide the email,password and username",
    });
  }
  await users.create({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  res.status(201).json({
    message: "user registered successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "please provide email and password",
    });
  }

  const [data] = await users.findAll({
    where: {
      email,
    },
  });

  if (!data) {
    return res.status(400).json({
      message: "user is not registered with above email",
    });
  }

  const isMatched = bcrypt.compareSync(password, data.password);
  if (isMatched) {
    const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });
    res.cookie("jwtToken", token);
    res.status(200).json({
      message: "login successfully",
      data:token
    });
  } else {
    res.status(400).json({
      message: "invalid email or password",
    });
  }
};
