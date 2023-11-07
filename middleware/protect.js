const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Khereglegch = require('../uilchilgee/models/Khereglegch');
const CustomError = require('../utils/CustomError');

exports.protect = asyncHandler(async (req, res, next) => {
    if(!req.headers.authorization) throw new CustomError('accessToken дамжуулаагүй байна!');
    const token = req.headers.authorization.split(' ')[1];
    if(!token) throw new CustomError('accessToken буруу байна!');
    const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
    req.khereglegch = await Khereglegch.findById(tokenObj.id);
    next();
});