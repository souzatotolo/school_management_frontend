import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [form, setForm] = useState({
    codigo: '',
    nome: '',
    serie: '',
    periodo: '',
    dia_semana: '',
    qtd_alunos: '',
    materia_id: '',
    sala_id: '',
  });

  useEffect(() => {
    loadTurmas();
  }, []);

  const loadTurmas = async () => {
    const response = await axios.get('http://localhost:3333/turmas');
    setTurmas(response.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3333/turmas', form);
    loadTurmas();
  };

  const excluirTurma = async (id) => {
    await axios.put(`http://localhost:3333/turmas/${id}`, { exclusao: true });
    loadTurmas();
  };

  return (
    <div>
      <h1>Turmas</h1>
      <form onSubmit={handleSubmit}>
        <input name="codigo" placeholder="Código" onChange={handleChange} />
        <input name="nome" placeholder="Nome" onChange={handleChange} />
        <input name="serie" placeholder="Série" onChange={handleChange} />
        <input name="periodo" placeholder="Período" onChange={handleChange} />
        <input
          name="dia_semana"
          placeholder="Dia da Semana"
          onChange={handleChange}
        />
        <input
          name="qtd_alunos"
          placeholder="Qtd de Alunos"
          onChange={handleChange}
        />
        <input
          name="materia_id"
          placeholder="ID da Matéria"
          onChange={handleChange}
        />
        <input
          name="sala_id"
          placeholder="ID da Sala"
          onChange={handleChange}
        />
        <button type="submit">Adicionar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Código da Turma</th>
            <th>Nome da Turma</th>
            <th>Série/ Ano</th>
            <th>Periodo</th>
            <th>Dia da Semana</th>
            <th>Quantidade de Alunos</th>
            <th>Materia</th>
            <th>Sala</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {turmas.map((turma) => (
            <tr key={turma.id}>
              <td>{turma.codigo}</td>
              <td>{turma.nome}</td>
              <td>{turma.serie}</td>
              <td>{turma.periodo}</td>
              <td>{turma.dia_semana}</td>
              <td>{turma.qtd_alunos}</td>
              <td>{turma.materia_id}</td>
              <td>{turma.sala_id}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => excluirTurma(turma.id)}
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
