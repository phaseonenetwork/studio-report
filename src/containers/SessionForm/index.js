import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Row,
  Col,
  message,
  TimePicker,
  Checkbox,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import SignatureComponent from '../../components/SignaturePad/SignaturePad';
import ListField from '../../components/ListField/ListField';
import { useRef } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import SessionReportService from '../../services/SessionReportService';
// import Timepicker from 'react-time-picker';
import './index.css';
import Finished from '../../components/Finished/Finished';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import useAuth from '../../hooks/useAuth';

const formDefaultValues = {
  data: '',
  startTime: '',
  endTime: '',
  artist: '',
  label: '',
  personWhoBooked: '',
  engineer: '',
  assistantEngineer: '',
  featuredArtists: '',
  sessionName: '',
  fileLocation: '',
  micsUsed: [],
  preAmpsUsed: [],
  outboardGearUsed: [],
  instrumentsUsed: [],
  sslSessionName: '',
  engineerSignature: '',
  assistantEngineerSignature: '',
  clientSignature: '',
  notes: '',
};

const SessionForm = () => {
  const engineerSignRef = useRef();
  const assistantEngineerSignRef = useRef();
  const clientSignRef = useRef();
  const [form] = Form.useForm();
  let { id } = useParams();
  const service = SessionReportService();
  const [finished, setFinished] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { setLoading } = useContext(LoadingContext);

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

  const getSessionReport = () => {
    const formId = id;
    if (formId) {
      setLoading(true);
      service
        .get(formId)
        .then((data) => {
          if (data) {
            if (data.status === 'completed') {
              setFinished(data);
            } else {
              loadFormData(data);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error?.statusCode === 404) {
            navigate('/404');
          }
          setLoading(false);
        });
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    getSessionReport();
  }, []);

  const onFinish = (values) => {
    values.engineerSignature = engineerSignRef.current.getPng();
    values.assistantEngineerSignature =
      assistantEngineerSignRef.current.getPng();
    values.clientSignature = clientSignRef.current.getPng();
    const formId = id;

    if (formId) {
      values._id = formId;
    }

    if (!values.agree) {
      message.error('You need to accept terms and conditions.');
      return 0;
    }

    delete values.agree;

    setLoading(true);
    service
      .finish(values)
      .then((data) => {
        message.success('The contract was finished successfully.');
        setFinished(data);
        setLoading(false);
        navigate(`/${data?._id}`);
      })
      .catch(() => setLoading(false));
  };

  const onUpdate = () => {
    const values = form.getFieldsValue();
    values.engineerSignature = engineerSignRef.current.getPng();
    values.assistantEngineerSignature =
      assistantEngineerSignRef.current.getPng();
    values.clientSignature = clientSignRef.current.getPng();

    setLoading(true);

    delete values.agree;

    service
      .update(values)
      .then((response) => {
        message.success('Your changes were saved successfully.');
        setLoading(false);
        navigate(`/${response?._id}`);
      })
      .catch(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {!finished && (
        <Row align="middle" justify="center">
          <Col lg={16} md={23} sm={23} xs={23}>
            <Form
              form={form}
              name="form"
              layout="vertical"
              initialValues={{
                ...formDefaultValues,
                _id: id,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item name="_id" hidden />
              <Form.Item name="date" label="Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="startTime" label="Start Time">
                <TimePicker
                  showSecond={false}
                  style={{ width: '100%' }}
                  format="hh:mm A"
                />
                {/* <Timepicker disableClock className="custom-timepicker-theme" /> */}
              </Form.Item>
              <Form.Item name="endTime" label="End Time">
                <TimePicker
                  showSecond={false}
                  style={{ width: '100%' }}
                  format="hh:mm A"
                />
                {/* <Timepicker disableClock className="custom-timepicker-theme" /> */}
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
              <Form.Item name="agree" valuePropName="checked">
                <Checkbox>
                  By signing this document I herby agree to abide by the terms
                  and conditions presented within and can confirm, to the best
                  of my knowledge, that all information presented within is
                  accurate and truthful.
                </Checkbox>
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
      )}
      {finished && <Finished sessionReport={finished} />}
    </>
  );
};

export default SessionForm;
