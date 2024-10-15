import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Salas() {
  const [salas, setSalas] = useState([]);
  const [form, setForm] = useState({
    codigo: '',
    nome: '',
  });

  useEffect(() => {
    loadSalas();
  }, []);

  const loadSalas = async () => {
    const response = await axios.get('http://localhost:3333/salas');
    setSalas(response.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3333/salas', form);
    loadSalas();
  };

  const excluirSala = async (id) => {
    await axios.put(`/salas/${id}`, { exclusao: true });
    loadSalas();
  };

  return (
    <div>
      <h1>Salas</h1>
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
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.codigo}</td>
              <td>{sala.nome}</td>
              <td>
                <button className="delete" onClick={() => excluirSala(sala.id)}>
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
