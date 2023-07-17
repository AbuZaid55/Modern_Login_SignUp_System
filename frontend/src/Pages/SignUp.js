import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import postData from '../Functions/postData'
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate()
  const [newUser,setNewUser] = useState({name:"",email:"",password:"",confirm_pass:""})
  const handleInput = (e)=>{ setNewUser({...newUser,[e.target.name]:e.target.value})}
  //Submit Form
  const submitForm = async(e)=>{
    e.preventDefault()
    const result = await postData("signUp",newUser)
    if(result.status !== 200){
      toast.error(result.data.massage)
    }else{
      setNewUser({name:"",email:"",password:"",confirm_pass:""})
      navigate('/verifyEmail', {state:{user:result.data.user,path:'signUp'}})
    }
 }
  return (
    <div className=" bg-blue-50 flex items-center justify-center min-h-screen text-sm sm:text-base">
      <div className=' bg-white flex w-full mx-4 sm:w-2/3 rounded-3xl shadow-2xl'>
        <div className='lg:w-3/6 p-2 hidden lg:block'><img className=' min-h-full rounded-2xl' alt='Pic' src='./img/signun-card.png' /></div>
        <div className='lg:w-3/6 w-full p-4 sm:p-10 m-auto'>
          <h1 className=' text-center text-xl sm:text-3xl font-bold text-blue-600'>Sign Up</h1>
          <p className=' text-center py-2 '>Please enter your details to Sign Up</p>
          <form className='flex flex-col mx-auto'style={{maxWidth:"400px"}}  onSubmit={(e)=>{submitForm(e)}}>
            <label className=' pt-6' htmlFor='name'>Name</label>
            <input className=' border-b-2 border-blue-600' name='name' placeholder='Enter your name' id='name' value={newUser.name} onChange={(e)=>{handleInput(e)}}/>
            <label className='pt-6' htmlFor='email'>Email</label>
            <input className=' border-b-2 border-blue-600' name='email' placeholder='Enter your email' id='email' value={newUser.email} onChange={(e)=>{handleInput(e)}}/>
            <label  className='pt-6'htmlFor='password'>Password(between 8 to 12 character)</label>
            <input className=' border-b-2 border-blue-600' name='password' placeholder='Enter your password' id='password' value={newUser.password} onChange={(e)=>{handleInput(e)}}/>
            <label className='pt-6' htmlFor='confirm_pass'>Confirm password</label>
            <input className=' border-b-2 border-blue-600' name='confirm_pass' placeholder='Enter your confirm password' id='confirm_pass' value={newUser.confirm_pass} onChange={(e)=>{handleInput(e)}}/>
            <button className=' bg-blue-600 w-2/5 self-center text-white mt-9 sm:text-lg py-2 rounded-lg' type='submit'>Sing Up</button>
          </form>
          <p className=' text-center mt-6'>Have an account? <Link className=' text-blue-600' to='/logIn'> Log In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
