import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import CreateSessionReportModal from '../../components/CreateSessionReportModal/CreateSessionReportModal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Temporary
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, []);

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
