import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// render - pages
const MedicineDiscovery = Loadable(lazy(() => import('pages/extra-pages/MedicineDiscovery')));
const Login = Loadable(lazy(() => import('pages/authentication/Login')));
const Register = Loadable(lazy(() => import('pages/authentication/Register')));
const Cart = Loadable(lazy(() => import('pages/extra-pages/cart')));
const Payment = Loadable(lazy(() => import('pages/extra-pages/payment')));
const History = Loadable(lazy(() => import('pages/extra-pages/history')));
const ContactUs = Loadable(lazy(() => import('pages/extra-pages/contactUs')));
const Dashboard = Loadable(lazy(() => import('pages/extra-pages/Dashboard')));
const Pharmacy = Loadable(lazy(() => import('pages/extra-pages/Pharmacy')));
const Inventory = Loadable(lazy(() => import('pages/extra-pages/Inventory')));
const Claim = Loadable(lazy(() => import('pages/extra-pages/Claim')));
const PharmacyDashboard = Loadable(lazy(() => import('pages/extra-pages/PharmacyDashboard')));
const PharmacyProfile = Loadable(lazy(() => import('pages/extra-pages/PharmacyProfile')));
const PrescriptionList = Loadable(lazy(() => import('pages/extra-pages/PrescriptionList')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <MedicineDiscovery />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/cart',
      element: <ProtectedRoute element={Cart} />,
    },
    {
      path: '/payment',
      element: <ProtectedRoute element={Payment} />,
    },
    {
      path: '/history',
      element: <ProtectedRoute element={History} />,
    },
    {
      path: '/contact',
      element: <ContactUs />,
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute element={Dashboard} />,
    },
    {
      path: '/pharmacy',
      element: <ProtectedRoute element={Pharmacy} />,
    },
    {
      path: '/inventory',
      element: <ProtectedRoute element={Inventory} />,
    },
    {
      path: '/claim',
      element: <ProtectedRoute element={Claim} />,
    },
    {
      path: '/pharmacy-dashboard',
      element: <ProtectedRoute element={PharmacyDashboard} />,
    },
    {
      path: '/pharmacy-profile',
      element: <ProtectedRoute element={PharmacyProfile} />,
    },
    {
      path: '/prescription-list',
      element: <ProtectedRoute element={PrescriptionList} />,
    },
  ],
};

export default MainRoutes;