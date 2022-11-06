import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const {user} = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const getUser = async()=>{
  try {
    dispatch(showLoading())
    const response = await axios.get('/user',{headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }})
    dispatch(hideLoading())
    if(response.data.message){
      dispatch(setUser(response.data)) 
    }else{
      console.log('Token error')
      localStorage.clear()
      navigate('/login')
    }
  } catch (error) {
    dispatch(hideLoading())
    localStorage.clear()
    navigate('/login')
    console.log(error.message,' Get User error')
  }
 }

  useEffect(()=>{
    if(!user){
      getUser()
    }
  },[user])
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
