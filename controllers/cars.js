
const Cars = require('../models/Cars');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors');
const jwt = require('jsonwebtoken');

const getAll = async(req, res) => {
    const {pagesize, pageindex, carname, timestamp} = req.body;

    // if (!pagesize || !pageindex || !timestamp) {
    //     throw new BadRequestError('page size, page index, or timestamp cannot be empty');
    // }

    carsRegex = new RegExp(carname, 'i')

    const cars = await Cars.find({carname: carsRegex}).skip(pagesize * pageindex)
    .limit(pagesize);

    const carsCount = await Cars.find({carname: carsRegex}).count();
    res.status(StatusCodes.OK).json({list: cars, totalcount: carsCount})
}


module.exports = {
    getAll
}