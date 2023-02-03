import { Result } from 'antd';
import React from 'react';

const Error404 = () => (
  <Result
    style={{ width: '100%', height: '100%' }}
    status="404"
    title="This page was not found."
  />
);

export default Error404;
