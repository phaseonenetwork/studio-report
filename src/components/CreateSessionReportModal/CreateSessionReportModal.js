import React, { useContext } from 'react';
import { Button, Form, Input, Row, Col, Modal, message } from 'antd';

import axios from 'axios';
import { INVALID_EMAIL, REQUIRED } from '../../utils/messages';
import SessionReportService from '../../services/SessionReportService';
import { LoadingContext } from '../Loading/LoadingContext';

const EMAIL_RULES = [
  { required: true, message: REQUIRED },
  { type: 'email', message: INVALID_EMAIL },
];

const CreateSessionReportModal = ({ isOpen, onCancel }) => {
  const [form] = Form.useForm();
  const service = SessionReportService();

  const { setLoading } = useContext(LoadingContext);

  const onFinish = (values) => {
    setLoading(true);
    service
      .create(values)
      .then(() => {
        message.success('Session Report created successfully!');
        setLoading(false);
      })
      .catch(() => {
        message.error('Something went wrong!');
        setLoading(false);
      });
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
