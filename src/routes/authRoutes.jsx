import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from 'pages/Sign/Login';
import PreSignup from 'pages/Sign/PreSignup';
import DonorSignup from 'pages/Sign/DonorSignup';
import InstituitionSignup from 'pages/Sign/InstituitionSignup';

export default function AuthRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/donor-signup" element={<DonorSignup />} />
        <Route path="/pre-signup" element={<PreSignup />} />
        <Route path="/instituition-signup" element={<InstituitionSignup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}
