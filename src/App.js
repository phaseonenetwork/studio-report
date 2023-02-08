import './App.css';
import routes from './router';
import { Layout, Typography, Image, Row, Col, Button } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './components/Loading/LoadingContext';
import Loading from './components/Loading/Loading';
import { AuthProvider } from './context/AuthContext';
import logo from './image/embassy-logo-transparent.png';

const { Content, Header } = Layout;
const { Title } = Typography;

const App = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Loading />
        <Layout style={{ minHeight: '100vh' }} className="App">
          <Header style={{ marginBottom: '2.5rem' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Image
                  width="175px"
                  src={logo}
                  preview={false}
                  alt="embassy-studios-logo"
                />
              </Col>
            </Row>
          </Header>
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
