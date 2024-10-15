import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/appRoutes';

function App() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link className="link" to="/alunos">
              Alunos
            </Link>
          </li>
          <li>
            <Link className="link" to="/salas">
              Salas
            </Link>
          </li>
          <li>
            <Link className="link" to="/materias">
              Matérias
            </Link>
          </li>
          <li>
            <Link className="link" to="/turmas">
              Turmas
            </Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
