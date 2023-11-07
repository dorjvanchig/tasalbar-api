const mongoose = require('mongoose');

const TankhimSchema = new mongoose.Schema({
    tankhimiinNer: {
        type: String,        
        required: [true, 'Танхимын нэр оруулна уу'],
        unique: true
    },
    urtrag: {
        type: Number,
        required: [true, 'Уртраг оруулна уу']
    },
    urgurug: {
        type: Number,
        required: [true, 'Өргөрөг оруулна уу']
    },
    svgNer: {
        type: String,        
        required: [true, 'SVG нэр оруулна уу'],
    }
});
module.exports = mongoose.model("Tankhim", TankhimSchema);