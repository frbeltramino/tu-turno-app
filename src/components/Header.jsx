import React from 'react'

export const Header = () => {
  const isLoggedIn = true;
  return (
    <>
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt"></i>
          &nbsp;Tu turno en la veterinaria
        </span>
        {
          isLoggedIn
            ? <button className="btn btn-outline-danger">
              <i className="fas fa-sign-out-alt"></i>
              &nbsp;
              <span>Salir</span>
            </button>
            : <button className="btn btn-outline-success">
              <i className="fas fa-sign-in-alt"></i>
              &nbsp;
              <span>Ingresar</span>
            </button>
        }


      </div>

    </>

  )
}
