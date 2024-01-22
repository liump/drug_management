import ErrorPage from "../views/ErrorPage/error-page";
import Login from '@/views/Login/Login'
import Register from '@/views/Register/Register'
import Layout from '@/views/Layout/Layout'
import Home from '@/views/Home/Home'
import App from '@/App'

import {
    createBrowserRouter,
} from "react-router-dom";

const routerList = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        children: [],
    },
    {
        path: '/register',
        element: <Register />,
        children: [],
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/home',
                element: <Home />
            }
        ],
    },
    // {
    //     path: '/layout',
    //     element: <Layout />,
    //     children: [
    //         {
    //             path: '/layout',
    //             //重定向到 '/layout/welcome'
    //             element: <Navigate to="/layout/welcome" />,
    //             // element: <Welcome />,
    //         },
    //         {
    //             path: '/layout/welcome',
    //             element: <Welcome />,
    //         },
    //     ],
    // },
    {
        path: '*',
        element: <ErrorPage />,
        children: [],
    },
]);

export default routerList