import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateModal from '../UpdateModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentMateria, setCurrentMateria] = useState(null); // Matéria para exclusão ou edição
  const [form, setForm] = useState({ codigo: '', nome: '' });

  useEffect(() => {
    loadMaterias();
  }, []);

  const loadMaterias = async () => {
    const response = await axios.get('http://localhost:3333/materias');
    setMaterias(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMateria) {
        await axios.put(
          `http://localhost:3333/materias/update/${currentMateria.id}`,
          form
        );
      } else {
        await axios.post('http://localhost:3333/materias', form);
      }
      loadMaterias();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar matéria:', error);
    }
  };

  const openModal = (materia = null) => {
    setIsModalOpen(true);
    if (materia) {
      setCurrentMateria(materia);
      setForm(materia);
    } else {
      setCurrentMateria(null);
      setForm({ codigo: '', nome: '' });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMateria(null);
  };

  const openConfirm = (materia) => {
    console.log('Abrindo modal de confirmação:', materia);
    setCurrentMateria(materia);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setCurrentMateria(null);
  };

  const excluirMateria = async () => {
    try {
      await axios.put(`http://localhost:3333/materias/${currentMateria.id}`, {
        exclusao: true,
      });
      loadMaterias();
      closeConfirm();
    } catch (error) {
      console.error('Erro ao excluir matéria:', error);
    }
  };

  return (
    <div>
      <h1>Matérias</h1>
      <button onClick={() => openModal()}>Adicionar Matéria</button>

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
                <button onClick={() => openModal(materia)}>Editar</button>
                <button className="delete" onClick={() => openConfirm(materia)}>
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
        title={currentMateria ? 'Editar Matéria' : 'Adicionar Matéria'}
        editableFields={['codigo', 'nome']}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={excluirMateria}
        message="Você deseja realmente excluir essa matéria?"
      />
    </div>
  );
}
