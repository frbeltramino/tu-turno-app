
import '../styles/mainStyles.css'

export const ModalProfessionals = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="modal-close" onClick={onClose}>✖</button>
          {children}
        </div>
      </div>
    </>

  );
};
