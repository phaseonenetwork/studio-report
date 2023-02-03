import { Spin } from 'antd';
import React, { useContext } from 'react';
import { LoadingContext } from './LoadingContext';
import './Loading.css';

const Loading = ({ message = 'Loading...' }) => {
  const { loading } = useContext(LoadingContext);

  return (
    <>
      {loading && (
        <div className="loading">
          <Spin tip={message} size="large"></Spin>
        </div>
      )}
    </>
  );
};

export default Loading;
