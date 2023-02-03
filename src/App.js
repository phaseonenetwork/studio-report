import './App.css';
import { Layout, Typography } from 'antd';
import SessionForm from './containers/SessionForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './containers/Home';
import { LoadingProvider } from './components/Loading/LoadingContext';
import Loading from './components/Loading/Loading';
import Error404 from './components/errors/Error404';

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
  { path: '/404', element: <Error404 /> },
  {
    path: '*',
    element: <Error404 />,
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
