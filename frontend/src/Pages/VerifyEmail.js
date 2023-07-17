import React, { useState } from 'react'
import { useLocation ,useNavigate } from 'react-router-dom'
import postData from '../Functions/postData'
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  try {
    var userId = location.state.user._id 
    var path = location.state.path
  } catch (error) {
    toast.error("Invalid User")
  }
  const [otp, setOtp]=useState('')
  const submitForm = async(e)=>{
    e.preventDefault()
    const result = await postData("verify_email",{userId,otp})
    if(result.status!==200){
      toast.error(result.data.massage)
    }else{
      if(path==='signUp'){
        navigate('/logIn')
      }else{
        navigate('/')
      }
      toast.success(result.data.massage)
    }
  }
  const resendOtp = async(e)=>{
    e.preventDefault()
    const result = await postData('resendVerificationCode', { userId })
    if(result.status!==200){
      toast.error(result.data.massage)
    }else{
      setOtp('')
      toast.success(result.data.massage)
    }
  }
  return (
    <div className='flex items-center justify-center bg-blue-50 text-sm sm:tex-base min-h-screen'>
      <div className='bg-white flex rounded-3xl p-2 w-4/5 sm:w-1/2 shadow-2xl'>
        <div className=' lg:w-3/6 hidden lg:block'><img className=' min-h-full rounded-2xl' alt='Pic' src='./img/otp-card.jpg'/></div>
        <div className=' w-full lg:w-3/6 m-auto p-4 sm:p-10'>
            <h1 className=' sm:text-3xl text-xl text-center font-bold text-blue-600 mb-5'>Verify your email! </h1>
            <p className='text-center mx-auto' style={{maxWidth:"300px"}}>Please enter the 4-digit verfication code that was sent to your email id</p>
            <p className='text-center'>The code is valid for 30 minutes.</p>
            <form className='flex flex-col mx-auto' style={{maxWidth:"300px"}} onSubmit={(e)=>{submitForm(e)}}>
              <label className='pt-6' htmlFor='otp'>Verification code</label>
              <input className=' border-b-2 border-blue-600' name='otp' placeholder='Enter verification code' id='otp' value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
              <div className='flex justify-between'>
                <button className='w-1/3 bg-blue-600 text-white py-2 rounded-lg mt-9' onClick={(e)=>{resendOtp(e)}} >Resend OTP</button>
                <button className='w-1/3 bg-blue-600 text-white py-2 rounded-lg mt-9' type='submit'>Continue</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default VerifyEmail
