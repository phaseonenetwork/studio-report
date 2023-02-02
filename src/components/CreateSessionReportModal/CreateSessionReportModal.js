import React from 'react';
import { Button, Form, Input, Row, Col, Modal } from 'antd';

import axios from 'axios';
import { INVALID_EMAIL, REQUIRED } from '../../utils/messages';

const EMAIL_RULES = [
  { required: true, message: REQUIRED },
  { type: 'email', message: INVALID_EMAIL },
];

const CreateSessionReportModal = ({ isOpen, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post('http://localhost:3001/session-reports/create', values)
      .then((res) => console.log('success', res))
      .catch((error) => console.log('error', error));
  };

  return (
    <Modal
      title="Create Session Report"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Row align="middle" justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="form"
            initialValues={{}}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="engineerEmail"
              label="Engineer Email"
              rules={EMAIL_RULES}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="assistantEngineerEmail"
              label="Assistant Engineer Email"
              rules={EMAIL_RULES}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="clientEmail"
              label="Client Email"
              rules={EMAIL_RULES}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ justifyContent: 'center', display: 'flex' }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateSessionReportModal;
