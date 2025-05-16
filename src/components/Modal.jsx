import React from "react";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-50px); }
  to { transform: translateY(0); }
`;

// Estilos
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  animation: ${slideIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  padding: 20px;
  background: ${(props) =>
    props.type === "success"
      ? "#4CAF50"
      : props.type === "error"
      ? "#F44336"
      : "#2196F3"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ModalBody = styled.div`
  padding: 20px;
  color: #555;
  line-height: 1.5;
  font-size: 1rem;
`;

const ModalFooter = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #eee;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &.primary {
    background: ${(props) =>
      props.type === "success" ? "#4CAF50" : "#2196F3"};
    color: white;

    &:hover {
      background: ${(props) =>
        props.type === "success" ? "#3e8e41" : "#0b7dda"};
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: #f5f5f5;
    color: #333;

    &:hover {
      background: #e0e0e0;
      transform: translateY(-1px);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  children,
}) => {
  if (!isOpen) return null;

  const Icon =
    type === "success"
      ? FaCheckCircle
      : type === "error"
      ? FaExclamationTriangle
      : FaExclamationTriangle;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader type={type}>
          <IconContainer>
            <Icon size={24} />
            <ModalTitle>{title}</ModalTitle>
          </IconContainer>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {message && <p>{message}</p>}
          {children}
        </ModalBody>

        {type === "confirm" && (
          <ModalFooter>
            <Button className="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button className="primary" onClick={onConfirm} type={type}>
              {confirmText}
            </Button>
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
