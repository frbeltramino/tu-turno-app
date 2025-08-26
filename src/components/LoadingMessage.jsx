import React from 'react'
import { useTranslation } from 'react-i18next'

export const LoadingMessage = () => {
  const { t } = useTranslation();
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
            <strong>{ t("i18n.common.001") }</strong>
          </div>
        </section>
      </div>
    </div>
  </div>
   
  )
}
