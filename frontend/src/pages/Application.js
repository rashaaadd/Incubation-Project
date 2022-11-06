import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

function Application() { //head
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const onFinish = async(values) => {
    try {
        dispatch(showLoading())
        const response = await axios.post('/user/application',values,{headers : {
            Authorization : 'Bearer ' + localStorage.getItem('token')
          }})
        dispatch(hideLoading())
        if(response.data.error){
          toast.error(response.data.error)
          navigate('/')
        }else{
          console.log(response,'form response in controller');
          toast.success(response.data.message)
          navigate('/')
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error,'bhusadbuhasdb');
        toast.error(error.message)
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Application form</h1>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title">Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Email"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="City"
              name="city"
              rules={[{ required: true }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="State"
              name="state"
              rules={[{ required: true }]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Contact"
              name="contact"
              htmltype="number"
              rules={[{ required: true }]}
            >
              <Input placeholder="Contact" />
            </Form.Item>
          </Col>
        </Row>
        <h1 className="card-title">Company Information</h1>
        <hr />
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Company Name"
              name="companyName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Company Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Describe your company and products"
              name="companyDetails"
              rules={[{ required: true }]}
            >
              <Input placeholder="Company Details" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Describe your team and background"
              name="companyTeamDetails"
              rules={[{ required: true }]}
            >
              <Input placeholder="Company Team Details" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button className="primary-button" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </Layout>
  );
}

export default Application;
