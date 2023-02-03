import './App.css';
import { Layout, Typography } from 'antd';
import SessionForm from './containers/SessionForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './containers/Home';
import { LoadingProvider } from './components/Loading/LoadingContext';
import Loading from './components/Loading/Loading';

const { Content } = Layout;
const { Title } = Typography;

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:id',
    element: <SessionForm />,
  },
  {
    path: '*',
    element: <div>404 ERROR</div>,
  },
]);

const App = () => {
  return (
    <LoadingProvider>
      <Loading />
      <Layout
        style={{ padding: '2rem 2.5rem', minHeight: '100vh' }}
        className="App"
      >
        <Content>
          <Title>Embassy Studios Session Report</Title>
          <RouterProvider router={routes} />
        </Content>
      </Layout>
    </LoadingProvider>
  );
};

export default App;
