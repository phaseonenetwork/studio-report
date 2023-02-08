import React, { useContext, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Modal,
  message,
  Result,
  Typography,
} from 'antd';

import { INVALID_EMAIL, REQUIRED } from '../../utils/messages';
import SessionReportService from '../../services/SessionReportService';
import { LoadingContext } from '../Loading/LoadingContext';

const EMAIL_RULES = [
  { required: true, message: REQUIRED },
  { type: 'email', message: INVALID_EMAIL },
];

const { Text } = Typography;

const CreateSessionReportModal = ({ isOpen, onCancel }) => {
  const [form] = Form.useForm();
  const service = SessionReportService();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestResponse, setRequestResponse] = useState({});

  const { setLoading } = useContext(LoadingContext);

  const onCloseRequestModal = () => {
    setIsRequestModalOpen(!isRequestModalOpen);
  };

  const onFinish = async (values) => {
    setLoading(true);
    await service
      .create(values)
      .then((response) => {
        setRequestResponse(response);
        setIsRequestModalOpen(true);
        setLoading(false);
      })
      .catch(() => {
        message.error('Something went wrong!');
        setLoading(false);
      });
  };

  const handleRequestResult = (response) => {
    if (!response.url) return;
    const { url } = response;
    const resultStatus = 'success';
    const resultTitle = 'Successfully generated report link!';
    const subTitle = `Please check your email, a link was sent to access your report. Or use this link to access the report.`;

    const onClickCopyClipboard = () => {
      navigator.clipboard.writeText(url);
      message.success('Copied to clipboard!', 1);
    };

    const onClickOpenForm = () => {
      window.open(url);
    };

    return (
      <Result
        status={resultStatus}
        title={resultTitle}
        subTitle={subTitle}
        extra={[
          <Text key="report-url" keyboard>
            {url}
          </Text>,
          <Button
            key="copy-btn"
            onClick={onClickCopyClipboard}
            style={{ marginTop: '.5rem' }}
          >
            Copy to clipboard
          </Button>,
          <Button
            key="copy-btn"
            onClick={onClickOpenForm}
            style={{ marginTop: '.5rem' }}
          >
            Open Form
          </Button>,
        ]}
      />
    );
  };

  return (
    <>
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

              <Form.Item style={{ justifyContent: 'center', display: 'flex' }}>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      <Modal
        open={isRequestModalOpen}
        onCancel={onCloseRequestModal}
        footer={null}
      >
        {handleRequestResult(requestResponse)}
      </Modal>
    </>
  );
};

export default CreateSessionReportModal;
