import React from 'react'

export const LoadingMessage = () => {
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <section
          className="alert alert-success text-center p-3 d-flex align-items-center justify-content-center"
          style={{ height: "200px" }}
        >
          <div className="d-flex align-items-center">
            <div className="spinner-border text-success me-2" role="status"></div>
            <strong>Cargando datos...</strong>
          </div>
        </section>
      </div>
    </div>
  </div>
   
  )
}
