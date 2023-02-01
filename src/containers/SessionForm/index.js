import React from 'react';
import { Button, DatePicker, Form, Input, TimePicker, Row, Col } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import SignatureComponent from '../../components/SignaturePad/SignaturePad';
import ListField from '../../components/ListField/ListField';
import { useRef } from 'react';
import axios from 'axios';

const SessionForm = () => {
  const engineerSignRef = useRef();
  const assistantEngineerSignRef = useRef();
  const clientSignRef = useRef();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.engineerSignature = engineerSignRef.current.getPng();
    values.assistantEngineerSignature =
      assistantEngineerSignRef.current.getPng();
    values.clientSignature = clientSignRef.current.getPng();

    axios
      .post('http://localhost:3001/session-reports', values)
      .then((res) => console.log('success', res))
      .catch((error) => console.log('error', error));
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
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="date" label="Date">
              <DatePicker />
            </Form.Item>
            <Form.Item name="startTime" label="Start Time">
              <TimePicker />
            </Form.Item>
            <Form.Item name="endTime" label="End Time">
              <TimePicker />
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
              name="assistantEngineerSignature"
              label="Assistant Engineer Signature"
            >
              <SignatureComponent
                ref={assistantEngineerSignRef}
                padNumber={2}
              />
            </Form.Item>
            <Form.Item name="clientSignature" label="Client Signature">
              <SignatureComponent ref={clientSignRef} padNumber={3} />
            </Form.Item>
            <Form.Item name="notes" label="Additional Notes">
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SessionForm;
