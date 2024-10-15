import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({
    codigo: '',
    nome: '',
    cpf: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    endereco: '',
    turma_id: '',
  });

  useEffect(() => {
    loadAlunos();
  }, []);

  const loadAlunos = async () => {
    const response = await axios.get('http://localhost:3333/alunos');
    setAlunos(response.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3333/alunos', form);
    loadAlunos();
  };

  const excluirAluno = async (id) => {
    await axios.put(`http://localhost:3333/alunos/${id}`, { exclusao: true });
    loadAlunos();
  };

  return (
    <div>
      <h1>Alunos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="codigo"
          placeholder="Código"
          onChange={handleChange}
          value={form.codigo}
        />
        <input
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          value={form.nome}
        />
        <input
          name="cpf"
          placeholder="CPF"
          onChange={handleChange}
          value={form.cpf}
        />
        <input
          type="date"
          name="data_nascimento"
          placeholder="Data de Nascimento"
          onChange={handleChange}
          value={form.data_nascimento}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          name="telefone"
          placeholder="Telefone"
          onChange={handleChange}
          value={form.telefone}
        />
        <input
          name="endereco"
          placeholder="Endereço"
          onChange={handleChange}
          value={form.endereco}
        />
        <input
          name="turma_id"
          placeholder="ID da Turma"
          onChange={handleChange}
          value={form.turma_id}
        />
        <button type="submit">Adicionar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Código do aluno</th>
            <th>Nome do aluno</th>
            <th>Turma</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereco</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.codigo}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.turma_id}</td>
              <td>{aluno.cpf}</td>
              <td>{aluno.data_nascimento}</td>
              <td>{aluno.email}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.endereco}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => excluirAluno(aluno.id)}
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
