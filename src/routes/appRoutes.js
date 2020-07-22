import HomePage from '../pages/HomePage';
import About from '../pages/About';
import DetailProduct from 'pages/DetailProduct';
import XeTayGa from 'pages/XeTayGa';
import XeSo from 'pages/XeSo';
import Feedback from 'pages/Feedback';
import SearchResult from 'pages/SearchResult';
import Sale from 'pages/Sale';

export const appRouter = [
    {
        path: '/',
        component: HomePage,
        exact: true
    },
    {
        path: '/about',
        component: About,
        exact: false
    },
    {
        path: '/product/:id',
        component: DetailProduct,
        exact: false
    },
    {
        path: '/xe-tay-ga',
        component: XeTayGa,
        exact: false
    },
    {
        path: '/xe-so',
        component: XeSo,
        exact: false
    },
    {
        path: '/feedback',
        component: Feedback,
        exact: false
    },
    {
        path: '/search',
        component: SearchResult,
        exact: false
    },
    {
        path: '/sale',
        component: Sale,
        exact: false
    }
];
