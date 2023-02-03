import { Result } from 'antd';
import React from 'react';

const Finished = () => (
  <Result
    style={{ width: '100%', height: '100%' }}
    status="success"
    title="Success!"
    subTitle="The Session Report was finished!"
  />
);

export default Finished;
