import React, { useState } from 'react'
import getData from '../Functions/getData'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const Home = () => {
  const [user,setUser]=useState({name:"Abu Zaid"})
  const navigate = useNavigate()
  const authentication = async()=>{
    const result  = await getData()
    if(result.status!==200){
      navigate('/logIn')
      toast.error(result.data.massage)
    }else{
      setUser(result.data.user)
    }
  }

  useEffect(()=>{
    authentication()
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center'>
      <div className='bg-white p-28 rounded-3xl shadow-2xl '>
      <h1 className=' text-8xl font-medium font-mono'>Welcome to <spna className=' text-blue-600 font-serif'>{user.name}</spna></h1>
      </div>
    </div>
  )
}

export default Home;
