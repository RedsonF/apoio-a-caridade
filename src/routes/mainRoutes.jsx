import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AuthRoutes from 'routes/authRoutes';
import DonorRoutes from 'routes/donorRoutes';
import InstitutionRoutes from 'routes/institutionRoutes';

export default function MainRoutes() {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return <div />;
  }

  switch (role) {
    case 'donor':
      return <DonorRoutes />;
    case 'institution':
      return <InstitutionRoutes />;
    default:
      return <AuthRoutes />;
  }
}
