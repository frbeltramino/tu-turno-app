import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ModalCommon } from './ModalCommon';
import { useAuth } from '../hooks/useAuth';
import { AppointmentsContext } from '../context/AppointmentsContext';

export const Header = () => {

  const { authStatus, handleShowUserSettings } = useContext(AuthContext);
  const { startLogout, showLogin } = useAuth();
  const { handleCreateNewAppointment } = useContext(AppointmentsContext);

  const isLoggedIn = authStatus === "authenticated";
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    startLogout();
    setModalOpen(false);
    setDropdownOpen(false);
  };

  const handleCreateAppointment = () => {
    handleCreateNewAppointment(true);
    handleShowUserSettings(false);
    setDropdownOpen(false);
  };

  const handleGoToProfile = () => {
    handleCreateNewAppointment(false);
    handleShowUserSettings(false);
    setDropdownOpen(false);
  };

  const onClickBtnSettings = () => {
    handleCreateNewAppointment(false);
    handleShowUserSettings(true);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-3 px-3 py-2">
        <div className="container-fluid d-flex align-items-center">
          <span className="navbar-brand text-light fw-bold text-break text-wrap m-0 fs-6">
            <i className="fas fa-calendar-alt"></i>
            &nbsp; Tu turno en la veterinaria
          </span>

          {/* Menú de usuario */}
          {isLoggedIn ? (
            <div className="dropdown ms-auto">
              <button
                className="btn btn-sm btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <i className="fas fa-user-circle fs-5"></i>
              </button>

              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show position-absolute mt-2" style={{ right: 0 }}>
                  <li>
                    <button className="dropdown-item" onClick={handleGoToProfile}>
                      <i className="fas fa-user me-2"></i>
                      Perfil
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleCreateAppointment}>
                      <i className="fas fa-plus-circle me-2"></i>
                      Crear nuevo turno
                    </button>
                  </li>
                  <li>
                  <button className="dropdown-item" onClick={onClickBtnSettings}>
                    <i className="fas fa-cog me-2"></i>
                    Configuración
                  </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => setModalOpen(true)}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Salir
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button className="btn btn-sm btn-outline-success ms-auto" onClick={showLogin}>
              <i className="fas fa-sign-in-alt"></i>&nbsp;
              <span className="d-none d-sm-inline">Ingresar</span>
            </button>
          )}
        </div>
      </nav>

      {/* Modal de confirmación de logout */}
      <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center">
          <div className="mb-3">
            <i className="bi bi-exclamation-triangle-fill text-warning fs-1"></i>
          </div>
          <h5 className="fw-bold">¿Estás seguro que deseas salir?</h5>
        </div>
        <div className="modal-footer d-flex justify-content-center gap-3 mt-4">
          <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setModalOpen(false)}>
            Cancelar
          </button>
          <button type="button" className="btn btn-danger px-4" onClick={handleLogout}>
            Sí, salir
          </button>
        </div>
      </ModalCommon>
    </>
  );
};