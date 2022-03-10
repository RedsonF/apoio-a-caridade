import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from 'pages/Instituition/Home';
import Publications from 'pages/Instituition/Publications';
import AddPublication from 'pages/Instituition/AddPublication';
import Publication from 'pages/Instituition/Publication';
import EditPublication from 'pages/Instituition/EditPublication';
import Settings from 'pages/Instituition/Settings';
import SettingsName from 'pages/Instituition/SettingsName';
import SettingsLocalization from 'pages/Instituition/SettingsLocalization';
import SettingsImage from 'pages/Instituition/SettingsImage';
import SettingsBankData from 'pages/Instituition/SettingsBankData';

export default function InstitutionRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/institution/home" element={<Home />} />
        <Route path="/institution/publications" element={<Publications />} />
        <Route
          path="/institution/add-publication"
          element={<AddPublication />}
        />
        <Route path="/institution/publication/:id" element={<Publication />} />
        <Route
          path="/institution/edit-publication/:id"
          element={<EditPublication />}
        />
        <Route path="/institution/settings" element={<Settings />} />
        <Route path="/institution/settings/name" element={<SettingsName />} />
        <Route
          path="/institution/settings/location"
          element={<SettingsLocalization />}
        />
        <Route
          path="/institution/settings/images"
          element={<SettingsImage />}
        />
        <Route
          path="/institution/settings/bank-data"
          element={<SettingsBankData />}
        />
        <Route path="*" element={<Navigate to="/institution/home" />} />
      </Routes>
    </AnimatePresence>
  );
}
