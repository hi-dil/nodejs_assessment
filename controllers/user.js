const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors');
const jwt = require('jsonwebtoken');

const getProfile = async(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ');
    const userInfo = jwt.verify(token[1], process.env.JWT_SECRETKEY);
    const {userId} = userInfo;

    const user = await User.findOne({
        _id: userId
    });

    if (!user) {
        throw new NotFoundError(`No user with id ${userId}`);
    }

    const {username, displayusername} = user;
    res.status(200).json({username: username, displayusername: displayusername, userid: userId});
}

const updateProfile = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ');
    const userInfo = jwt.verify(token[1], process.env.JWT_SECRETKEY);
    const {userId} = userInfo;

    const user = await User.findOne({
        _id: userId
    });

    if (!user) {
        throw new NotFoundError(`No user with id ${userId}`);
    }

    const { displayusername, timestamp } = req.body;
    if (displayusername === '' || timestamp ==='') {
        throw new BadRequestError('displayusername or timestamp fields cannot be empty');
    }

    const profile = await User.findByIdAndUpdate({
        _id: userId
    }, req.body, {new:true, runValidators: true})

    res.status(StatusCodes.OK).send();
}

module.exports = {
    getProfile,
    updateProfile
}