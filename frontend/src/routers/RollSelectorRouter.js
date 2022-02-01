import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RollSelector from '../Pages/Rollselector/RollSelector.';

import RegisterFormCompany from '../Pages/RegisterCommerce/RegisterFormCompany';

export function RollSelectorRouter() {
  return (
    <Routes>
      <Route path="/" element={<RollSelector />} />
      <Route
        path="/registerformcommerce"
        element={<RegisterFormCompany type={1} />}
      />
      <Route
        path="/register_form_ong"
        element={<RegisterFormCompany type={2} />}
      />
    </Routes>
  );
}
