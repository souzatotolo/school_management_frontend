import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateModal from '../UpdateModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentAluno, setCurrentAluno] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentAluno) {
        await axios.put(
          `http://localhost:3333/alunos/update/${currentAluno.id}`,
          form
        );
      } else {
        await axios.post('http://localhost:3333/alunos', form);
      }
      loadAlunos();
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Erro ao adicionar ou editar aluno.');
      }
    }
  };

  const openModal = (aluno = null) => {
    setIsModalOpen(true);
    setErrorMessage('');
    if (aluno) {
      setCurrentAluno(aluno);
      setForm(aluno);
    } else {
      setCurrentAluno(null);
      setForm({
        codigo: '',
        nome: '',
        cpf: '',
        data_nascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        turma_id: '',
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAluno(null);
  };

  const openConfirm = (aluno) => {
    setCurrentAluno(aluno);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setCurrentAluno(null);
  };

  const excluirAluno = async () => {
    await axios.put(`http://localhost:3333/alunos/${currentAluno.id}`, {
      exclusao: true,
    });
    loadAlunos();
    closeConfirm();
  };

  return (
    <div>
      <h1>Alunos</h1>
      <button onClick={() => openModal()}>Adicionar Aluno</button>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Turma</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
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
                <button onClick={() => openModal(aluno)}>Editar</button>
                <button className="delete" onClick={() => openConfirm(aluno)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        formData={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title={currentAluno ? 'Editar Aluno' : 'Adicionar Aluno'}
        editableFields={[
          'codigo',
          'nome',
          'cpf',
          'data_nascimento',
          'email',
          'telefone',
          'endereco',
          'turma_id',
        ]}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={excluirAluno}
        message="Você deseja realmente excluir este aluno?"
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
