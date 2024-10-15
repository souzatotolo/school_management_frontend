import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    codigo: '',
    nome: '',
  });

  useEffect(() => {
    loadMaterias();
  }, []);

  const loadMaterias = async () => {
    const response = await axios.get('http://localhost:3333/materias');
    setMaterias(response.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3333/materias', form);
    loadMaterias();
  };

  const excluirMateria = async (id) => {
    await axios.put(`http://localhost:3333/materias/${id}`, { exclusao: true });
    loadMaterias();
  };

  return (
    <div>
      <h1>Matérias</h1>
      <form onSubmit={handleSubmit}>
        <input name="codigo" placeholder="Código" onChange={handleChange} />
        <input name="nome" placeholder="Nome" onChange={handleChange} />
        <button type="submit">Adicionar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.id}>
              <td>{materia.codigo}</td>
              <td>{materia.nome}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => excluirMateria(materia.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
