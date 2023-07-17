const JWT = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    validated:{
        type:Boolean,
        default:false,
        required:true
    }
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const hashPass = await bcrypt.hash(this.password,10)
        this.password = hashPass
    }
    next()
})

userSchema.methods = {
    async comparePass(password){
        return await bcrypt.compare(password,this.password)

    },
    generateToken(){
        return JWT.sign({email:this.email,password:this.password},process.env.JWT_KEY)

    }
}

module.exports = mongoose.model("user",userSchema)