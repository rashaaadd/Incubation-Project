import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Rejectedlist() {
    const [rejectedApps,setRejectedApps] = useState([])
    const dispatch = useDispatch()
    const getRejectedApps = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-rejected-applications ',{headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
              }})//head
              console.log(response,'response of user details fetching admin side');
            dispatch(hideLoading())
            if(response.data.message) {
                setRejectedApps(response.data.data)
            }
            console.log(rejectedApps,'sadaadasdasd users users users');
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const changeApplicationStatus = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-approved-applications ',{headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
              }})//head
              console.log(response,'response of user details fetching admin side');
            dispatch(hideLoading())
            if(response.data.data) {
                setRejectedApps(response.data.data)
            }
            console.log(rejectedApps,'sadaadasdasd users users users');
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        getRejectedApps()
    },[])

    const columns = [
        {
            title:'Company Name',
            dataIndex: 'companyName'
        },
        {
            title:'Email',
            dataIndex: 'email'
        },
        {
            title:'Status',
            dataIndex: 'status'
        },
    ]
  return (
    <Layout>
        <h1 className="page-title">
           Rejected List
        </h1>
        <Table columns={columns} dataSource={rejectedApps}/>
    </Layout>
  )
}

export default Rejectedlist
