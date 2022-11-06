import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function PendingApplicationlist() {
    const [pendingApps,setPendingApps] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getPendingApps = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-pending-applications ',{headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
              }})
              console.log(response,'response of user details fetching admin side');
            dispatch(hideLoading())
            if(response.data.message) {
                setPendingApps(response.data.data)
            }
            console.log(pendingApps,'sadaadasdasd users users users');
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.response.data.message);
        }
    }

    const changeApplicationStatus = async(appId,status)=>{
        try {
            dispatch(showLoading())
            const response = await axios.post('/admin/change-application-status',{appId,status},{headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
              }})
              console.log(response,'response of user details fetching admin side');
            dispatch(hideLoading())
            if(response.data.data) {
                getPendingApps()
                toast.success(response.data.message)
                
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.response.data.message);
        }
        
    }

    useEffect(()=>{
        getPendingApps()
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
        {
            title:'Actions',
            dataIndex: 'actions',
            render:(text,record)=>(
                <div >
                    {record.status === 'Pending' && 
                    <div className="d-flex">
                        <i className="ri-checkbox-circle-line action-link text-success" onClick={()=>{changeApplicationStatus(record._id,'Approved')}}></i>
                        <i className="ri-close-circle-line action-link text-danger" onClick={()=>{changeApplicationStatus(record._id,'Rejected')}}></i>
                    </div>
                    }
                </div>
            )
        }
    ]
  return (
    <Layout>
        <h1 className="page-title">
            Pending Application List
        </h1>
        <Table columns={columns} dataSource={pendingApps}/>
    </Layout>
  )
}

export default PendingApplicationlist
