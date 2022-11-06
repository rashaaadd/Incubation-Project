import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/user/register", values);
      dispatch(hideLoading());
      console.log(response.data.token);
      if (response.data.message) {
        toast.success(response.data.message);
        toast("Redirecting to Login Page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error, " Register Error");
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="authentication">
      <div className="authenticationForm card p-3">
        <h1 className="card-title">Nice to meet you</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item className="mb-2" label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item className="mb-2" label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item className="mb-2" label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <Button className="primary-button my-2" htmlType="submit">
              REGISTER
            </Button>

            <Link className="anchor" to={"/login"}>
              Already have an account?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
