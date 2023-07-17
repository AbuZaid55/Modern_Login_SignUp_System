import React from 'react'
import { Link } from 'react-router-dom'
import postData from '../Functions/postData'
import { useState } from 'react'
import { toast } from 'react-toastify';

const SendResetLink = () => {

  const [email,setEmail]=useState('')
  const submitForm = async(e)=>{
    e.preventDefault()
    const result = await postData('SendResetLink',{ email })
    if(result.status!==200){
      toast.error(result.data.massage)
    }else{
      setEmail('')
      toast.success(result.data.massage)
    }
  }
  return (
   <div className='flex items-center justify-center bg-blue-50 text-sm sm:tex-base min-h-screen'>
     <div className='bg-white flex rounded-3xl p-2 w-4/5 sm:w-1/2 shadow-2xl'>
      <div className=' lg:w-3/6 hidden lg:block'><img alt='Pic' className=' min-h-full rounded-2xl border-2 border-blue-600' src='./img/sendResetLink-card.jpg' style={{maxHeight:"355px"}}/></div>
      <div className=' w-full lg:w-3/6 m-auto p-4 sm:p-10'>
        <h1 className=' sm:text-3xl text-xl text-center font-bold text-blue-600 mb-5'>Change Password</h1>
        <p className='text-center'>Send link to your email id</p>
        <p className='text-center'>The link is valid for 30 minutes.</p>
        <form className='flex flex-col mx-auto'style={{maxWidth:"300px"}} onSubmit={(e)=>{submitForm(e)}}>
          <label className='pt-6' htmlFor='email'>Email</label>
          <input className=' border-b-2 border-blue-600' name='email' placeholder='Enter your email id' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <button className=' bg-blue-600 w-2/5 self-center text-white py-2 rounded-lg mt-9' type='submit'>Send Link</button>  
        </form>
        <p className='mt-4 w-1/2 text-start text-blue-600 inline-block '><Link to='/signUp'>Sign Up</Link></p>
        <p className=' mt-4 w-1/2 text-blue-600 text-end ml-auto inline-block'><Link to='/logIn'>Log In</Link></p>
      </div>
    </div>
   </div>
  )
}

export default SendResetLink
