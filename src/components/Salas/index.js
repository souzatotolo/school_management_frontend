import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateModal from '../UpdateModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal'; // Importando o modal de confirmação

export default function Salas() {
  const [salas, setSalas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentSala, setCurrentSala] = useState(null); // Sala selecionada para edição ou exclusão
  const [form, setForm] = useState({ codigo: '', nome: '' });

  useEffect(() => {
    loadSalas();
  }, []);

  const loadSalas = async () => {
    const response = await axios.get('http://localhost:3333/salas');
    setSalas(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentSala) {
      await axios.put(
        `http://localhost:3333/salas/update/${currentSala.id}`,
        form
      );
    } else {
      await axios.post('http://localhost:3333/salas', form);
    }
    loadSalas();
    closeModal();
  };

  const openModal = (sala = null) => {
    setIsModalOpen(true);
    if (sala) {
      setCurrentSala(sala);
      setForm(sala);
    } else {
      setCurrentSala(null);
      setForm({ codigo: '', nome: '' });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSala(null);
  };

  const openConfirm = (sala) => {
    setCurrentSala(sala);
    setIsConfirmOpen(true);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setCurrentSala(null);
  };

  const excluirSala = async () => {
    await axios.put(`http://localhost:3333/salas/${currentSala.id}`, {
      exclusao: true,
    });
    loadSalas();
    closeConfirm();
  };

  return (
    <div>
      <h1>Salas</h1>
      <button onClick={() => openModal()}>Adicionar Sala</button>

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
                <button onClick={() => openModal(sala)}>Editar</button>
                <button className="delete" onClick={() => openConfirm(sala)}>
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
        title={currentSala ? 'Editar Sala' : 'Adicionar Sala'}
        editableFields={['codigo', 'nome']}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={excluirSala}
        message="Você deseja realmente excluir esta sala?"
      />
    </div>
  );
}
