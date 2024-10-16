import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateModal from '../UpdateModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; // Importando o modal de confirmação

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentTurma, setCurrentTurma] = useState(null); // Turma selecionada para edição ou exclusão
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTurma) {
      await axios.put(
        `http://localhost:3333/turmas/update/${currentTurma.id}`,
        form
      );
    } else {
      await axios.post('http://localhost:3333/turmas', form);
    }
    loadTurmas();
    closeModal();
  };

  const openModal = (turma = null) => {
    setIsModalOpen(true);
    if (turma) {
      setCurrentTurma(turma);
      setForm(turma);
    } else {
      setCurrentTurma(null);
      setForm({
        codigo: '',
        nome: '',
        serie: '',
        periodo: '',
        dia_semana: '',
        qtd_alunos: '',
        materia_id: '',
        sala_id: '',
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTurma(null);
  };

  const openConfirm = (turma) => {
    setCurrentTurma(turma);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setCurrentTurma(null);
  };

  const excluirTurma = async () => {
    await axios.put(`http://localhost:3333/turmas/${currentTurma.id}`, {
      exclusao: true,
    });
    loadTurmas();
    closeConfirm();
  };

  return (
    <div>
      <h1>Turmas</h1>
      <button onClick={() => openModal()}>Adicionar Turma</button>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Série/Ano</th>
            <th>Período</th>
            <th>Dia da Semana</th>
            <th>Quantidade de Alunos</th>
            <th>Matéria</th>
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
                <button onClick={() => openModal(turma)}>Editar</button>
                <button className="delete" onClick={() => openConfirm(turma)}>
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
        title={currentTurma ? 'Editar Turma' : 'Adicionar Turma'}
        editableFields={[
          'codigo',
          'nome',
          'serie',
          'periodo',
          'dia_semana',
          'qtd_alunos',
          'materia_id',
          'sala_id',
        ]}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={excluirTurma}
        message="Você deseja realmente excluir esta turma?"
      />
    </div>
  );
}
