import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import postData from '../Functions/postData'
import { useState } from 'react'
import { toast } from 'react-toastify';

const LogIn = () => {
  const navigate = useNavigate()
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const submitForm = async(e)=>{
    e.preventDefault()
    const result = await postData('logIn',{email,password})
    if(result.status===401){
      setEmail('')
      setPassword('')
      navigate('/verifyEmail',{state:{user:result.data.user,path:'logIn'}})
    }else if(result.status !== 200){
      toast.error(result.data.massage)
    }else{
      setEmail('')
      setPassword('')
      navigate('/')
    }
  }
  return (
    <div className=' bg-blue-50 flex items-center justify-center min-h-screen text-sm sm:text-base'>
      <div className='bg-white flex justify-center w-full mx-4 sm:w-2/3 rounded-3xl shadow-2xl'>
        <div className='lg:w-3/6 p-2 hidden lg:block'><img className=' min-h-full rounded-2xl' alt='Pic' src='./img/login-card.jpg' style={{maxHeight:"100px !importent"}} /></div>
        <div className='lg:w-3/6 w-full p-8 sm:p-16 m-auto'>
          <h1 className=' text-xl sm:text-3xl font-bold text-center text-blue-600'>Log In</h1>
          <p className=' text-center py-2'>Please enter your details to Log In</p>
          <form className='flex flex-col mx-auto'style={{maxWidth:"350px"}}  onSubmit={(e)=>{submitForm(e)}}>
            <label className='pt-6' htmlFor='email'>Email</label>
            <input className=' border-b-2 border-blue-600' name='email' placeholder='Enter your email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <label className='pt-6' htmlFor='password'>Password</label>
            <input className=' border-b-2 border-blue-600' name='password' placeholder='Enter your password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className=' bg-blue-600 text-white w-2/5 self-center mt-9 py-2 rounded-lg' type='submit'>Log In</button>
          </form>
          <div className='flex justify-between mt-6'>
            <p>New user? <Link className='text-blue-600' to='/signUp'> Sign Up</Link></p>
            <p>Forgot Password? <Link className='text-blue-600' to='/sendResetLink'> Click!</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn;
