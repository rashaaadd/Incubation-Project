import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Approvedlist() {
    const [approvedApps,setApprovedApps] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getApprovedApps = async()=>{
        try {
            dispatch(showLoading())
            const response = await axios.get('/admin/get-approved-applications ',{headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
              }})
              console.log(response,'response of user details fetching admin side');
            dispatch(hideLoading())
            if(response.data.message) {
                setApprovedApps(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        getApprovedApps()
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
                    {record.status === 'Approved' && 
                    <div className="d-flex">
                        <i class="ri-ticket-line action-link text-primary" onClick={()=>{navigate('/admin/slots')}}></i>
                    </div>
                    }
                </div>
            )
        }
    ]
  return (
    <Layout>
        <h1 className="page-title">
           Approved List
        </h1>
        <Table columns={columns} dataSource={approvedApps}/>
    </Layout>
  )
}

export default Approvedlist
