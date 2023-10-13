import React from 'react';

type ModalProps = {
  isOpen: boolean;
  imageSrc: string;
  alt: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, alt, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageSrc} alt={alt} className="w-full" />
      </div>
    </div>
  );
};

export default Modal;
