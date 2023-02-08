import React from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    try {
      await login(values.username, values.password);
      navigate('/');
    } catch (e) {
      message.warning('Please, check your credentials!');
    }
  };

  return (
    <Row style={{ marginTop: '5rem' }} align="middle" justify="center">
      <Col lg={8} md={16} sm={16} xs={16}>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLoginSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
