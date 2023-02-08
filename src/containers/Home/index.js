import React, { useState } from 'react';
import { Button } from 'antd';
import CreateSessionReportModal from '../../components/CreateSessionReportModal/CreateSessionReportModal';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div>
        <Button onClick={() => setIsModalOpen(true)}>
          Create New Session Report
        </Button>
      </div>
      <CreateSessionReportModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Home;
