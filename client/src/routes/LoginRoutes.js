import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// Import the new components
const MedicineDiscovery = Loadable(lazy(() => import('pages/extra-pages/MedicineDiscovery.js')));
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const Cart = Loadable(lazy(() => import('pages/extra-pages/cart.js'))); // Import Cart component
const History = Loadable(lazy(() => import('pages/extra-pages/history.js'))); // Import History component
const Payment = Loadable(lazy(() => import('pages/extra-pages/payment.js'))); // Import Payment component
const AboutUs = Loadable(lazy(() => import('pages/extra-pages/aboutUs.js'))); // Import About Us component
const ContactUs = Loadable(lazy(() => import('pages/extra-pages/contactUs.js'))); // Import Contact Us component

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <MedicineDiscovery /> // Set Medicine Discovery as the default route
        },
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'cart',
            element: <Cart /> // Route for Cart
        },
        {
            path: 'history',
            element: <History /> // Route for History
        },
        {
            path: 'payment',
            element: <Payment /> // Route for Payment
        },
        {
            path: 'aboutUs',
            element: <AboutUs /> // Route for About Us
        },
        {
            path: 'contactUs',
            element: <ContactUs /> // Route for Contact Us
        }
    ]
};

export default LoginRoutes;