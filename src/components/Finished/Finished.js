import { Button, Result } from 'antd';
import React from 'react';

const Finished = ({ sessionReport }) => (
  <Result
    style={{ width: '100%', height: '100%' }}
    status="success"
    title="Success!"
    subTitle="The Session Report was finished!"
    extra={[
      <Button onClick={() => window.open(sessionReport.contractUrl, '_blank')}>
        Download
      </Button>,
    ]}
  />
);

export default Finished;
