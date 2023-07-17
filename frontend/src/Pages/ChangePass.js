import React from 'react'
import postData from '../Functions/postData'
import { useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { toast } from 'react-toastify';

const ChangePass = () => {
  const token = new URLSearchParams(useLocation().search).get("token")
  const userId = new URLSearchParams(useLocation().search).get("id")
  const [data,setData]=useState({token:token,userId:userId, password:"", confirm_pass:""})
  const handleInput=(e)=>{ setData({...data,[e.target.name]:e.target.value})}
  const submitForm = async(e)=>{
    e.preventDefault()
    const result = await postData('changePass',data)
    if(result.status!==200){
      toast.error(result.data.massage)
    }else{
      setData({token:token,userId:userId, password:"", confirm_pass:""})
      toast.success(result.data.massage)
    }
  }
  return (
    <div className=' flex items-center justify-center text-sm sm:text-base bg-blue-50 min-h-screen'>
      <div className='flex bg-white p-2 rounded-3xl w-4/5 sm:w-1/2 shadow-2xl'>
        <div className='lg:w-3/6 hidden lg:block'><img className='min-h-full rounded-2xl' alt='Pic' src='./img/changePass-card.jpg'/></div>
        <div className=' w-full lg:w-3/6 m-auto p-4 sm:p-10'>
          <h1 className=' sm:text-3xl text-xl text-center font-bold text-blue-600 mb-5'>Change Password</h1>
          <form className='flex flex-col mx-auto'style={{maxWidth:"350px"}}  onSubmit={(e)=>{submitForm(e)}}>
              <label className='pt-6' htmlFor='password'>New password</label> 
              <input className=' border-b-2 border-blue-600' name='password' placeholder='Enter your new password' id='password'value={data.password} onChange={(e)=>{handleInput(e)}}/>
              <label className='pt-6' htmlFor='confirm_pass'>Confirm password</label>
              <input className=' border-b-2 border-blue-600' name='confirm_pass' placeholder='Enter your confirm password' id='confirm_pass' value={data.confirm_pass} onChange={(e)=>{handleInput(e)}}/>
              <button className=' bg-blue-600 w-2/5 self-center text-white py-2 rounded-lg mt-9' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePass;
