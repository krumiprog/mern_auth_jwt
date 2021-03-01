const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'Account already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ user: newUser._id }, process.env.JWT_SECRET);
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User is not found' });
    }

    if (await bcrypt.compare(password, user.password)) {
      jwt.sign({ user: user._id }, process.env.JWT_SECRET, (error, token) => {
        res
          .cookie('token', token, {
            httpOnly: true,
          })
          .json({ token: token, id: user._id }) // just test
          .send();
      });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const logoutUser = async (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

const getLogged = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    const a = jwt.verify(token, process.env.JWT_SECRET);
    res.json(true);
  } catch (error) {
    console.error(error);
    res.json(false);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: 'User with Id does not exist' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return res.status(400).json({ message: 'There are not users' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getLogged,
  getUserById,
  getAllUsers,
};
