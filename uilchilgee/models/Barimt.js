const mongoose = require('mongoose');

const BarimtSchema = new mongoose.Schema({
    zakhialgiinDugaar: {
        type: String,        
        required: [true, 'Захиалгын дугаар оруулна уу'],
        unique: true
    },
    togloltiinNer: {
        type: String,        
        required: [true, 'Тоглолт сонгоогүй байна'],
    },
    togloltiinTsag: {
        type: Date,        
        required: [true, 'Тоглолын цаг сонгоогүй байна'],
    },
    khereglegchiinUtas: {
        type: Number,        
        required: [true, 'Утас оруулна уу'],
    },
    niitDun: {
        type: Number,        
        required: [true, 'Нийт дүн оруулна уу'],
    },
    niitToo: {
        type: Number,        
        required: [true, 'Нийт тоо оруулна уу'],
    },
    zakhialsanOgnoo: {
        type: Date,
        default: Date.now
    },
    barimtiinZadargaa: {
        type: [
            {
                suudliinDugaar: {
                    type: String,        
                    required: [true, 'Суудал сонгоно уу'],
                },
                une: {
                    type: Number,        
                    required: [true, 'Үнэ оруулна уу'],
                }
            }
        ],        
        validate: v => Array.isArray(v) && v.length > 0
    }
});
module.exports = mongoose.model("Barimt", BarimtSchema);