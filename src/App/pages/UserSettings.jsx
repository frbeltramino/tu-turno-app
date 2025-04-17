import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../../components/Header';
import { ModalCommon } from '../../components/ModalCommon';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';

export const UserSettings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(storedUser || {});
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const { updateUserData} = useAuth();

  const openModal = (field) => {
    setFieldToEdit(field);
    setTempValue(userData[field]);
    setModalOpen(true);
  };

  const handleSaveField = () => {
    setUserData({ ...userData, [fieldToEdit]: tempValue });
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.name == "" || userData.phone == "") {
      Swal.fire('Error', 'Los campos no pueden estar sin valor.', 'error');
      return;
    }
    updateUserData(userData);
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">🧾 Mis Datos</h2>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div style={{ width: '100%' }}>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={userData.name || ""}
                disabled
              />
            </div>
            <Button variant="light" onClick={() => openModal('name')} className="ms-2">
              <i className="fas fa-pen"></i>
            </Button>
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div style={{ width: '100%' }}>
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={userData.phone || ""}
                disabled
              />
            </div>
            <Button variant="light" onClick={() => openModal('phone')} className="ms-2">
              <i className="fas fa-pen"></i>
            </Button>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={userData.email || ""}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
        </form>
      </div>

      <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="p-4">
        <h5 className="mb-3 text-lg font-semibold">
          Editar {fieldToEdit === 'name' ? 'Nombre' : 'Teléfono'}
        </h5>

        <input
          type="text"
          className="form-control mb-3"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSaveField}>
            Guardar
          </button>
        </div>
      </div>
    </ModalCommon>
    </>
  );
};
