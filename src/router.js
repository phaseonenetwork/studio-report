import SessionForm from './containers/SessionForm';
import { createBrowserRouter } from 'react-router-dom';
import Home from './containers/Home';
import Error404 from './components/errors/Error404';
import Login from './containers/Login';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  {
    path: '/',
    element: <SessionForm />,
  },
  { path: '/404', element: <Error404 /> },
  {
    path: '*',
    element: <Error404 />,
  },
]);

export default routes;
