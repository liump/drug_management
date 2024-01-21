import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Layout from '../layout/layout';

import Login from '../views/login';
import Welcome from '../views/welcome';
import NotFound from '../views/notFound';

import Home from '../views/home/home'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    children: [],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '/layout',
      //   //重定向到 '/layout/welcome'
      //   element: <Navigate to="/layout/welcome" />,
      //   // element: <Welcome />,
      // },
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/home',
        element: <Home />,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    children: [],
  },
]);

export default router;

