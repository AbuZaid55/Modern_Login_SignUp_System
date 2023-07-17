const JWT = require("jsonwebtoken")
const {sendError, sendSuccess} = require('../sendResponse')
const validator = require("email-validator")
const userModel = require('../models/userModel')
const varifiyEmailModel = require('../models/verifyEmail')
const changePassModel = require('../models/changePass')
const generateOTP  = require('../utils/generateOtp') 
const {otpMail,greetingMail,linkSendMail} = require('../utils/mail')

const home = (req,res)=>{
    sendSuccess(res,"Welcome to my home page",req.rootUser)
}
const singUp = async(req,res)=>{
    try {
        const { name,email,password,confirm_pass } = req.body
        if(name=='' || email=='' || password=='' || confirm_pass==''){
            return sendError(res,"All input field are required")
        }
        if(!validator.validate(email)){
            return sendError(res,"Invalid Email")
        } 
        if(password.length < 8 || password.length > 12){
            return sendError(res,"Your password should be between 8 to 12 character")
        }
        if(password != confirm_pass){
            return sendError(res,"password and confirm password does not match")
        } 
        const existUser = await userModel.findOne({email:email})
        if(existUser){
            return sendError(res,"Email address already exists")
        }
        const user = userModel(req.body)


        const OTP = generateOTP()
        await varifiyEmailModel({owner:user._id,otp:OTP}).save()
        await user.save()
        user.password = undefined

        otpMail(user.email,OTP)
        sendSuccess(res,"You are sign up successfully",user)
    } catch (error) {
        sendError(res,"Sign Up Failed!")
    }

}

const verifyEmail = async(req,res)=>{
    try {
        const {userId,otp} = req.body
        if(userId=='' || otp==''){
            return sendError(res, "Enter Your OTP")
        }
        const user = await userModel.findOne({_id:userId})
        if(!user){
            return sendError(res,"Sorry, User not found!")
        }
        if(user.validated){
            return sendError(res,"This account is already verified!")
        }
        const verifyEmailData = await varifiyEmailModel.findOne({owner:userId})
        if(!verifyEmailData){
            return sendError(res,"OTP has expired!")  
        }
        const isMatch = await verifyEmailData.compareOtp(otp)
        if(!isMatch){
            return sendError(res, "Please provide a valid OTP")
        }
        user.validated = true;
        await varifiyEmailModel.findByIdAndDelete(verifyEmailData.id)
        await user.save()

        greetingMail(user.email,"Your account has been verfied.")
        sendSuccess(res,"Your account has been verified.")
   } catch (error) {
    sendError(res,"Verification Failed!")
   }
}

const logIn = async(req,res)=>{
    try {
        const {email, password} = req.body
        if(email=='' || password==""){
            return sendError(res,"All input field are required")
        }
        if(!validator.validate(email)){
            return sendError(res,"Invalid Email Id")
        }
        const user = await userModel.findOne({email:email})
        if(!user){
            return sendError(res,"Invalid email or password")
        }
        const isMatch = await user.comparePass(password)
        if(!isMatch){
            return sendError(res,"Invalid email or password")
        }
        user.password = undefined

        const token = user.generateToken()
        res.cookie('jwtToken',token,{
            expires:new Date(Date.now() + 604800000),
            httpOnly:true
        })

        if(user.validated===false){
            const sendOtp = await varifiyEmailModel.findOne({owner:user._id})
            if(!sendOtp){
                const OTP = generateOTP()
                await varifiyEmailModel({owner:user._id,otp:OTP}).save()
                otpMail(user.email,OTP)
            }
            return sendSuccess(res,"Your account is not verifid!",user,401)
        }
        
        sendSuccess(res,"You are login successfully")
    } catch (error) {
        sendError(res,"Login Failed!")
    }
}

const resentVerificatonCode = async(req,res)=>{
    try {
        const {userId} = req.body
        if(userId==''){
            return sendError(res,"Enter User Id")
        }
        const user = await userModel.findOne({_id:userId})
        if(!user){
            return sendError(res,"Sorry, User not found!")
        }
        if(user.validated){
            return sendError(res,"User already verified!")
        }
        const varifiyEmailData = await varifiyEmailModel.findOne({owner:user._id})
        if(varifiyEmailData){
            return sendError(res,"OTP already has sent")
        }

        const OTP = generateOTP()
        await varifiyEmailModel({owner:user._id,otp:OTP}).save() 
        otpMail(user.email,OTP)
        
        sendSuccess(res,"OTP sent successfully")
   } catch (error) {
    sendError(res,"Resend Verification code Failed!")
   }


}

const sendResetLink = async(req,res)=>{
   try {
        const { email } = req.body
        if(email==''){
            return sendError(res,"Enter Email Id")
        }
        if(!validator.validate(email)){
            return sendError(res,"Invalid Email Id")
        }
        const user  = await userModel.findOne({email:email})
        if(!user){
            return sendError(res,"Sorry, User not found!")
        }
        const alreadySend = await changePassModel.findOne({owner:user._id})
        if(alreadySend){
            return sendError(res,"Reset Link already send")
        }

        const token = JWT.sign({_id:user._id,email:user.email},process.env.JWT_KEY)
        const result =  changePassModel({owner:user._id,token:token})
        await result.save()

        linkSendMail(user.email,`${process.env.FRONTEND_CHANGEPASSWORD_URL}?token=${token}&id=${user._id}`)
        sendSuccess(res,"Reset link sent successfully")
   } catch (error) {
    sendError(res,"send Reset Link Failed!")
   }
}

const changePass = async(req,res)=>{
    try {
        const {token, userId, password, confirm_pass} = req.body
        if(token=='' || userId=='' || password=='' || confirm_pass==''){   
            return sendError(res,"All field are required!")
        }
        if(password.length < 8 || password.length > 12){
            return sendError(res,"Your password should be between 8 to 12 character")
        }
        if(password != confirm_pass){
            return sendError(res,"password and confirm password does not match")
        } 
        const user = await userModel.findOne({_id:userId})
        if(!user){
            return sendError(res,"Sorry, User not found!")
        }
        const changePassData = await changePassModel.findOne({owner:user.id})
        if(!changePassData){
            return sendError(res,"Invalid token or userId")
        }
        const isMatch = await changePassData.compareToken(token)
        if(!isMatch){
            return sendError(res,"Invaild token")
        }
        const comparePass = await user.comparePass(password)
        if(comparePass){
            return sendError(res,"The new password must be different from the old password!")
        }
        user.password = password
        await changePassModel.findByIdAndDelete(changePassData._id)
        await user.save()
        greetingMail(user.email,"Your password has been changed.")
        sendSuccess(res,"Your password has been changed.")
    } catch (error) {
        sendError(res,"Change Password Failed!")
    }
}

module.exports = {
    home,
    singUp,
    verifyEmail,
    logIn,
    resentVerificatonCode,
    sendResetLink,
    changePass,
}