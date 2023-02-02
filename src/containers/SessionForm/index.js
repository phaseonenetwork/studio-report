import React, { useEffect } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  TimePicker,
  Row,
  Col,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import SignatureComponent from '../../components/SignaturePad/SignaturePad';
import ListField from '../../components/ListField/ListField';
import { useRef } from 'react';
import axios from 'axios';
import { INVALID_EMAIL, REQUIRED } from '../../utils/messages';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const EMAIL_RULES = [
  { required: true, message: REQUIRED },
  { type: 'email', message: INVALID_EMAIL },
];

const SessionForm = () => {
  const engineerSignRef = useRef();
  const assistantEngineerSignRef = useRef();
  const clientSignRef = useRef();
  const [form] = Form.useForm();
  let { id } = useParams();

  const loadFormData = (values) => {
    if (values.date) values.date = dayjs(new Date(values.date));
    if (values.startTime) values.startTime = dayjs(new Date(values.startTime));
    if (values.endTime) values.endTime = dayjs(new Date(values.endTime));

    if (values.engineerSignature) {
      engineerSignRef.current.setSignature(values.engineerSignature);
    }

    if (values.assistantEngineerSignature) {
      assistantEngineerSignRef.current.setSignature(
        values.assistantEngineerSignature
      );
    }

    if (values.clientSignature) {
      clientSignRef.current.setSignature(values.clientSignature);
    }

    form.setFieldsValue(values);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/session-reports/${id}`)
      .then((res) => {
        const values = res.data;
        loadFormData(values);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const onFinish = (values) => {
    values.engineerSignature = engineerSignRef.current.getPng();
    values.assistantEngineerSignature =
      assistantEngineerSignRef.current.getPng();
    values.clientSignature = clientSignRef.current.getPng();

    axios
      .post('http://localhost:3001/session-reports/finish', values)
      .then((res) => console.log('success', res))
      .catch((error) => console.log('error', error));
  };

  const onUpdate = () => {
    const values = form.getFieldsValue();

    axios
      .patch('http://localhost:3001/session-reports', values)
      .then((res) => message('SUCCESS'))
      .catch((error) => message('ERROR'));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row align="middle" justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="form"
            layout="vertical"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="_id" hidden />
            <Form.Item name="date" label="Date">
              <DatePicker />
            </Form.Item>
            <Form.Item name="startTime" label="Start Time">
              <TimePicker showSecond={false} />
            </Form.Item>
            <Form.Item name="endTime" label="End Time">
              <TimePicker showSecond={false} />
            </Form.Item>
            <Form.Item name="artist" label="Artist">
              <Input />
            </Form.Item>
            <Form.Item name="label" label="Label">
              <Input />
            </Form.Item>
            <Form.Item name="personWhoBooked" label="Person Who Booked">
              <Input />
            </Form.Item>
            <Form.Item name="engineer" label="Engineer">
              <Input />
            </Form.Item>
            <Form.Item name="assistantEngineer" label="Assistant Engineer">
              <Input />
            </Form.Item>
            <Form.Item name="featuredArtists" label="Featured Artists">
              <Input />
            </Form.Item>
            <Form.Item name="sessionName" label="Session Name">
              <Input />
            </Form.Item>
            <Form.Item name="fileLocation" label="File Location">
              <Input />
            </Form.Item>
            <ListField name="micsUsed" title="Mics Used" />
            <ListField name="preAmpsUsed" title="Pre-Amps Used" />
            <ListField name="outboardGearUsed" title="Out board Gear Used" />
            <ListField name="instrumentsUsed" title="Instruments Used" />
            <Form.Item name="sslSessionName" label="SSL Session Name">
              <Input />
            </Form.Item>
            <Form.Item name="engineerSignature" label="Engineer Signature">
              <SignatureComponent ref={engineerSignRef} padNumber={1} />
            </Form.Item>
            <Form.Item
              name="engineerEmail"
              label="Engineer Email"
              rules={EMAIL_RULES}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="assistantEngineerSignature"
              label="Assistant Engineer Signature"
            >
              <SignatureComponent
                ref={assistantEngineerSignRef}
                padNumber={2}
              />
            </Form.Item>
            <Form.Item
              name="assistantEngineerEmail"
              label="Assistant Engineer Email"
              rules={EMAIL_RULES}
            >
              <Input />
            </Form.Item>

            <Form.Item name="clientSignature" label="Client Signature">
              <SignatureComponent ref={clientSignRef} padNumber={3} />
            </Form.Item>
            <Form.Item
              name="clientEmail"
              label="Client Email"
              rules={EMAIL_RULES}
            >
              <Input />
            </Form.Item>
            <Form.Item name="notes" label="Additional Notes">
              <TextArea />
            </Form.Item>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Button type="primary" onClick={onUpdate}>
                Save
              </Button>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SessionForm;
