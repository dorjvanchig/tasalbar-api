const asyncHandler = require('express-async-handler');
const Khereglegch = require('../models/Khereglegch');
const CustomError = require('../../utils/CustomError');

exports.khereglegchBurtgekh = asyncHandler(async (req, res, next) => {
    await Khereglegch.create(req.body)
    res.status(200).json({
        success: true
    });
});

exports.nevtrekh = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) throw new CustomError('Нэвтрэх нэр эсвэл нууц үг хоосон байна!', 500);

    const khereglegch = await Khereglegch.findOne({ email }).select("+password");
    if(!khereglegch) throw new CustomError('Хэрэглэгч олдсонгүй', 500);
    const ok = await khereglegch.checkPassword(password);
    if(!ok) throw new CustomError('Нэвтрэх нэр эсвэл нууц үг буруу байна!', 500);
    res.status(200).json({
        success: true,
        token: khereglegch.getJsonWebToken(),
        khereglegch
    })
});