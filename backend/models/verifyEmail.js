const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const varifyEmailSchema =  new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        expires:300,
        default:Date.now()
    }
})
varifyEmailSchema. index( { "createdAt": 1 }, { expireAfterSeconds: process.env.EXPIRE_TOKEN_TIME } );

varifyEmailSchema.pre("save",async function(next){
    if(this.isModified("otp")){
        const hashOtp = await bcrypt.hash(this.otp,8)
        this.otp = hashOtp
    }
    next()
})

varifyEmailSchema.methods = {
    async compareOtp(otp){
        return await bcrypt.compare(otp,this.otp)
    }
}

module.exports = mongoose.model("varifyEmail",varifyEmailSchema)