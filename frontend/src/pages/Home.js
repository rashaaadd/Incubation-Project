import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../components/Layout'

function Home() {
  let [user,setUser] = useState({})
  let getData = async()=>{
    try {
      const response = await axios.get('/user',{
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      })
      console.log(response,'jkasdkasjhdkashdsa123561312312');
      setUser(response.data)  
    } catch (error) {
      console.log(error,'HOme autrisation oombi')
      toast.error(error.response.data.message)
    }
  }
  
  useEffect(()=>{
    getData()
  },[])
  return (
    <Layout>
      <h1 className='home'>Welcome{user?.isAdmin? ', Admin' : 'to Incubation Managment'}</h1>
      <div className="container">
        <div className="mt-5 p-5">
          {user?.isAdmin? null : <h5 className='text-center'>Please book your slot and make sure you have a seat for our event.</h5>}
        </div>
      </div>
    </Layout>
  )
}

export default Home
