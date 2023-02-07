import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();

  const handleLoginSubmit = async (values) => {
    console.log(login);
    try {
      await login(values.username, values.password);
      // redirect here
    } catch (e) {
      console.error(e);
      // handle error
    }
  }

  return (
    <Row style={{ marginTop: '3rem' }} align="middle" justify="center">
      <Col span={8}>
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
