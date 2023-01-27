import logo from './logo.svg';
import './App.css';
import { Button, DatePicker, Form, Input, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import SignatureComponent from './components/SignaturePad/SignaturePad';
import { useRef } from 'react';

const onFinish = (values) => {
  console.log('success', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function App() {
  const engineerSignRef = useRef();
  const [form] = Form.useForm();

  return (
    <div className="App" style={{ margin: 20 }}>
      <h1>Embassy Studios Session Report</h1>
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
        <Form.Item name="startAndEndTime" label="Start/End Time">
          <TimePicker.RangePicker />
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
        <Form.Item name="micsUsed" label="Mics Used">
          <Input />
        </Form.Item>
        <Form.Item name="preAmpsUsed" label="Pre-Amps Used">
          <Input />
        </Form.Item>
        <Form.Item name="outboardGearUsed" label="Out board Gear Used">
          <Input />
        </Form.Item>
        <Form.Item name="instrumentsUsed" label="Instruments Used">
          <Input />
        </Form.Item>
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
          <SignatureComponent padNumber={2} />
        </Form.Item>
        <Form.Item name="clientSignature" label="Client Signature">
          <SignatureComponent padNumber={3} />
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
    </div>
  );
}

export default App;
