import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alunos from '../components/Alunos/';
import Salas from '../components/Salas';
import Materias from '../components/Materias';
import Turmas from '../components/Turmas';
import Login from '../components/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/salas" element={<Salas />} />
      <Route path="/materias" element={<Materias />} />
      <Route path="/turmas" element={<Turmas />} />
    </Routes>
  );
}

export default AppRoutes;
