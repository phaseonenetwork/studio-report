import './App.css';
import { Layout, Typography } from 'antd';
import SessionForm from './containers/SessionForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const routes = createBrowserRouter([
  {
    path: '/',
    element: <SessionForm />,
  },
  {
    path: '*',
    element: <div>404 ERROR</div>,
  },
]);

const App = () => {
  return (
    <Layout style={{ padding: '2rem 2.5rem' }} className="App">
      <Content>
        <Title>Embassy Studios Session Report</Title>
        <RouterProvider router={routes} />
      </Content>
    </Layout>
  );
};

export default App;
