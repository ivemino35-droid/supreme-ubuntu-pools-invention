import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import CreatePool from './pages/CreatePool';
import Agreement from './pages/Agreement';
import Pool from './pages/Pool';
import ManifestoPage from './pages/Manifesto';
import TrustGraphPage from './pages/TrustGraph';

export default function App() {
  return (
    <HashRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreatePool />} />
        <Route path="/agreement/:id" element={<Agreement />} />
        <Route path="/pool/:id" element={<Pool />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="/trust-graph" element={<TrustGraphPage />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}
