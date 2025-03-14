import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ModalCommon } from './ModalCommon';

export const Header = () => {

  const { authStatus, logout, showLogin } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const isLoggedIn = authStatus === "authenticated";

  const handleLogout = () => {
    logout();
    setModalOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4 px-4">
        <div className="container-fluid d-flex align-items-center">
          {/* Título - Permite saltos de línea */}
          <span className="navbar-brand text-break text-wrap w-50">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;Tu turno en la veterinaria
          </span>

          {/* Botón - Se mantiene siempre a la derecha */}
          <button
            className={`btn ${isLoggedIn ? "btn-outline-danger" : "btn-outline-success"} ms-auto`}
            onClick={isLoggedIn ? () => setModalOpen(true) : showLogin}
          >
            <i className={`fas ${isLoggedIn ? "fa-sign-out-alt" : "fa-sign-in-alt"}`}></i>
            &nbsp;
            <span>{isLoggedIn ? "Salir" : "Ingresar"}</span>

          </button>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-screen">
        <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="text-center">
            <span className="fs-5">¿Estás seguro que deseas salir?</span>
          </div>

          <div className="modal-footer d-flex justify-content-between mt-5">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
              Sí, salir
            </button>
          </div>
        </ModalCommon>
      </div>

    </>

  )
}
