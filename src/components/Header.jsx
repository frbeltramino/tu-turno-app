import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ModalCommon } from './ModalCommon';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {

  const { authStatus } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const isLoggedIn = authStatus === "authenticated";

  const { startLogout, showLogin } = useAuth();

  const handleLogout = () => {
    startLogout();
    setModalOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-3 px-3 py-2">
        <div className="container-fluid d-flex align-items-center">
          {/* Título - Ahora más compacto */}
          <span className="navbar-brand text-light fw-bold text-break text-wrap m-0 fs-6">
            <i className="fas fa-calendar-alt"></i>
            &nbsp; Tu turno en la veterinaria
          </span>

          {/* Botón - Se mantiene alineado a la derecha */}
          <button
            className={`btn btn-sm ${isLoggedIn ? "btn-outline-danger" : "btn-outline-success"} ms-auto`}
            onClick={isLoggedIn ? () => setModalOpen(true) : showLogin}
          >
            <i className={`fas ${isLoggedIn ? "fa-sign-out-alt" : "fa-sign-in-alt"}`}></i>
            &nbsp;
            <span className="d-none d-sm-inline">{isLoggedIn ? "Salir" : "Ingresar"}</span>
          </button>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="text-center">
            <div className="mb-3">
              <i className="bi bi-exclamation-triangle-fill text-warning fs-1"></i>
            </div>
            <h5 className="fw-bold">¿Estás seguro que deseas salir?</h5>
          </div>

          <div className="modal-footer d-flex justify-content-center gap-3 mt-4">
            <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setModalOpen(false)}>
              ❌ Cancelar
            </button>
            <button type="button" className="btn btn-danger px-4" onClick={handleLogout}>
              🔴 Sí, salir
            </button>
          </div>
        </ModalCommon>
      </div>

    </>

  )
}
