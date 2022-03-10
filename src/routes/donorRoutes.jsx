import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from 'pages/Donor/Home';
import Instituition from 'pages/Donor/Instituition';
import Feed from 'pages/Donor/Feed';
import Publication from 'pages/Donor/Publication';
import Options from 'pages/Donor/Options';
import Preferences from 'pages/Donor/Preferences';
import Guide from 'pages/Donor/Guide';

export default function DonorRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/donor/home" element={<Home />} />
        <Route path="/donor/institution/:id" element={<Instituition />} />
        <Route path="/donor/feed" element={<Feed />} />
        <Route path="/donor/publication/:id" element={<Publication />} />
        <Route path="/donor/options" element={<Options />} />
        <Route path="/donor/preferences" element={<Preferences />} />
        <Route path="/donor/guide" element={<Guide />} />
        <Route path="*" element={<Navigate to="/donor/home" />} />
      </Routes>
    </AnimatePresence>
  );
}
