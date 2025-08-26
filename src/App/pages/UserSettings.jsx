import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../../components/Header';
import { ModalCommon } from '../../components/ModalCommon';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from "react-i18next";

export const UserSettings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState(storedUser || {});
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const { updateUserData, settingsLoading} = useAuth();

  const { t } = useTranslation();

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
      Swal.fire(t("i18n.common.005"), t("i18n.user.002"), 'error');
      return;
    }
    updateUserData(userData);
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">{ t("i18n.user.003") }</h2>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div style={{ width: '100%' }}>
              <label className="form-label">{ t("i18n.user.004") }</label>
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
              <label className="form-label">{ t("i18n.user.005") }</label>
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
            <label className="form-label">{ t("i18n.user.006") }</label>
            <input
              type="email"
              className="form-control"
              value={userData.email || ""}
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={settingsLoading}>{settingsLoading ? (<>
            <span className="spinner-border spinner-border-sm me-2"></span> { t("i18n.common.006") }
          </>) : t("i18n.common.007")}</button>
        </form>
      </div>

      <ModalCommon isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="p-4">
        <h5 className="mb-3 text-lg font-semibold">
          { t("i18n.user.007") } {fieldToEdit === 'name' ? t("i18n.user.004") : t("i18n.user.005")}
        </h5>

        <input
          type="text"
          className="form-control mb-3"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
            { t("i18n.common.004") }
          </button>
            <button className="btn btn-primary" onClick={handleSaveField}>
              { t("i18n.common.008") }
            </button>
        </div>
      </div>
    </ModalCommon>
    </>
  );
};
