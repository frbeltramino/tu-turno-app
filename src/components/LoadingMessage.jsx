import React from 'react'

export const LoadingMessage = () => {
  return (
    <div>
      <div className='row col-10 offset-sm-1 col-md-10' style={ {justifyContent:'center'}}>
          <section
          style={{ height: 200 }}
          className='alert alert-success text-center p-0 m-0 d-flex align-items-center justify-content-center'
          >
            <div className="d-flex align-items-center">
              <div className="spinner-border text-success me-2" role="status"></div>
              <strong>Cargando datos...</strong>
            </div>
          </section>
       
      </div>
    </div>
   
  )
}
