const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const KhereglegchSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Хэрэглэгийн имэйл хаягийг оруулна уу!'],
        unique: true,
        match: [/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, 'имэйл хаяг буруу байна']
    },
    password: {
        type: String,
        minlength: 3,
        required: [true, 'Нууц үгээ оруулна уу!'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
        type: String,
        required: [true, 'Хэрэглэгчийн эрхийг оруулна уу!'],
        enum: ["user", "admin"],
        default: "user"
    },
    burtgesenOgnoo: {
        type: Date,
        default: Date.now
    }
});

KhereglegchSchema.pre("save", async function(){
    const salt  = await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password, salt);
});

KhereglegchSchema.methods.getJsonWebToken = function(){
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRESIN
    });
    return token;
}

KhereglegchSchema.methods.checkPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("Khereglegch", KhereglegchSchema)