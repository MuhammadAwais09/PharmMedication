import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const isAuthenticated = !!localStorage.getItem('easyMedication_token');

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
