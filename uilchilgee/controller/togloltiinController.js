const asyncHandler = require('express-async-handler');
const path = require('path');
const Toglolt = require('../models/Toglolt');
const Tankhim = require('../models/Tankhim');
const Barimt = require('../models/Barimt');
const CustomError = require('../../utils/CustomError');

exports.togloltiinJagsaaltAvya = asyncHandler(async (req, res, next) => {
    const urdun = await Toglolt.find().select("+zurag");
    res.status(200).json({
        success: true,
        data: urdun
    });
});

exports.togloltAvya = asyncHandler(async (req, res, next) => {
    const { id } =  req.body;
    const urdun = await Toglolt.findById(id).select("+zurag");
    res.status(200).json({
        success: true,
        data: urdun
    });
});

exports.togloltBurtgekh = asyncHandler(async (req, res, next) => {
    await Toglolt.create(req.body)
    res.status(200).json({
        success: true
    });
});

exports.togloltiinZuragOruulya = asyncHandler(async (req, res, next) => {
    if(!req.params.id) throw new CustomError('ID явуулаагүй байна!');
    const toglolt = await Toglolt.findById(req.params.id)
    if(!toglolt) throw new CustomError(req.params.id + ' ID-тай тоглолт байхгүй байна!');
    if(!req.files) throw new CustomError('Зураг оруулна уу!.');
    const file = req.files.file;
    if(!file.mimetype.startsWith('image')) 
        throw new CustomError('Зураг оруулна уу!');
    if(!file.size > 1000000) 
        throw new CustomError('Таны зургын хэмжээ хэтэрсэн байна!');

    file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
    console.log('filename:', file.name)
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
        if(err) throw new CustomError('Файл хуулах явцад алдаа гарлаа :'+ err.message);
        toglolt.zurgiinZam = file.name;
        toglolt.save();
        res.status(200).json({
            success: true,
            data: file.name
        });
    });
});

exports.tankhimBurtgekh = asyncHandler(async (req, res, next) => {
    await Tankhim.create(req.body)
    res.status(200).json({
        success: true
    });
});

exports.tankhimiinJagsaaltAvya = asyncHandler(async (req, res, next) => {
    const urdun = await Tankhim.find()
    res.status(200).json({
        success: true,
        data: urdun
    });
});


exports.biletZakhialya = asyncHandler(async (req, res, next) => {
    await Barimt.create(req.body)
    res.status(200).json({
        success: true
    });
});

exports.zakhialsanSuudluudAvya = asyncHandler(async (req, res, next) => {
    const { togloltiinNer, togloltiinTsag } =  req.body;
    const suudluud = await Barimt.aggregate([
        { $match: { togloltiinNer, togloltiinTsag } },
        { $unwind : "$barimtiinZadargaa" },
        { $project: {
            suudliinDugaar: "$barimtiinZadargaa.suudliinDugaar",
        }} 
    ]);
    res.status(200).json({
        success: true,
        data: suudluud
    });
});