const mongoose = require('mongoose');

const TogloltiinSchema = new mongoose.Schema({
    ner: {
        type: String,        
        required: [true, 'Нэр оруулна уу'],
        unique: true
    },
    turul: {
        type: String,
        required: [true, 'Төрөл сонгоно уу']
    },
    tankhim: {
        type: String,
        required: [true, 'Танхим сонгоно уу']
    },
    zokhionBaiguulagch: {
        type: String,
    },
    uranButeelch: {
        type: String,
    },
    urgeljlekhKhugatsaa: {
        type: Number,
        required: [true, 'Үргэлжлэх хугацаа оруулна уу']
    },
    nasniiAngilal: {
        type: Number,
        required: [true, 'Насны ангилал оруулна уу']
    },
    delgerenguiMedeelel: {
        type: String
    },
    zurag: {
        select: false,
        type: String
    },
    uniinMedeelel: {
        type: [
            {
                buleg: {
                    type: String,        
                    required: [true, 'Бүлэг оруулна уу'],
                },
                ungu: {
                    type: String
                },
                une: {
                    type: Number,        
                    required: [true, 'Үнэ оруулна уу']
                },
                suudluud: {
                    type: Array,        
                    validate: v => Array.isArray(v) && v.length > 0
                },
            }
        ],        
        validate: v => Array.isArray(v) && v.length > 0
    },
    tsagiinMedeelel: {
        type: [
            {
                khezee: {
                    type: Date,        
                    required: [true, 'Цаг оруулна уу'],
                }
            }
        ],        
        validate: v => Array.isArray(v) && v.length > 0
    },
    burtgesenOgnoo: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Toglolt", TogloltiinSchema);