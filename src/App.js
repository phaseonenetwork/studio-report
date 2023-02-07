import './App.css';
import routes from './router';
import { Layout, Typography } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './components/Loading/LoadingContext';
import Loading from './components/Loading/Loading';
import { AuthProvider } from './context/AuthContext';

const { Content } = Layout;
const { Title } = Typography;

const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Loading />
        <Layout style={{ minHeight: '100vh' }} className="App">
          <Content>
            <Title>Embassy Studios Session Report</Title>
            <RouterProvider router={routes} />
          </Content>
        </Layout>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default App;
