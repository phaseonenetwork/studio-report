import React, { useState } from 'react';
import { Button } from 'antd';
import CreateSessionReportModal from '../../components/CreateSessionReportModal/CreateSessionReportModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
