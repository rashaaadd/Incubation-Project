import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Userslist() {
    const [users,setUsers] = useState([])
    const dispatch = useDispatch()
    const getUsersDetails = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-all-users',{headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
              }})//head
              console.log(response,'response of user details fetching admin side');
            dispatch(hideLoading())
            if(response.data.message) {
                console.log(response.data.data,'sjdasndjan');
                setUsers(response.data.data)
            }
            console.log(users,'sadaadasdasd users users users');
        } catch (error) {
            dispatch(hideLoading())
        }
    }

    useEffect(()=>{
        getUsersDetails()
    },[])

    const columns = [
        {
            title:'Name',
            dataIndex: 'name'
        },
        {
            title:'Email',
            dataIndex: 'email'
        },
        {
            title:'Created At',
            dataIndex: 'createdAt'
        },
    ]
  return (
    <Layout>
        <h1 className="page-header">
            Users List
        </h1>
        <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default Userslist
