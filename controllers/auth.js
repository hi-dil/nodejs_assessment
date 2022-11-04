const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');

const register = async (req, res) => {
  const { username } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new BadRequestError('user already exists');
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).send({ token: token, displayusername: user.displayUsername, userid: user._id });
};

const login = async (req, res) => {
  const { username, password, timestamp } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide username & password');
  }

  // compare password
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const update = await User.findOneAndUpdate({
    username: username
  }, { timestamp: timestamp })

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token: token, displayusername: user.displayUsername, userid: user._id });
};

const logout = async (req, res) => {
  const { timestamp } = req.body;
  if (!timestamp) {
    throw new BadRequestError('Please provide timestamp')
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ');
  const userInfo = jwt.verify(token[1], process.env.JWT_SECRETKEY);
  const { userId } = userInfo;

  const update = await User.findByIdAndUpdate({
    _id: userId}, {timestamp: timestamp});

  res.status(StatusCodes.OK).send();
}

module.exports = {
  register,
  login,
  logout
}
