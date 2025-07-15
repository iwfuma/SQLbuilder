import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTable from '../views/CreateTable';
import InsertTable from '../views/InsertTable';
import History from '../views/History';



const AppRoutes = () => {
  return (
    <Routes>s
      <Route path="/" element={<CreateTable />} />
      <Route path="/insert" element={<InsertTable />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default AppRoutes;
