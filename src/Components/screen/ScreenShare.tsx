import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";
import electronApi from "services/electronApi";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1b1e27",
    border: "none",
  },
};

function ScreenShare() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClickScreenIcon = () => {
    electronApi.getVideoSources();
  };
  return (
    <Container>
      <i
        onClick={() => onClickScreenIcon()}
        className="screen-share fa-solid fa-desktop"
      ></i>

      <span onClick={openModal} className="create-new-channel">
        <i className="header-title">Channels</i>
        <i className="plus-sign fa-solid fa-plus"></i>
      </span>
      <ModalContainer>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        ></Modal>
      </ModalContainer>
    </Container>
  );
}

const ModalContainer = styled.div`
  & .new-channel-form-container {
    display: inline-grid;
  }

  & .new-channel-createChannel-title {
    grid-row: 1;
  }

  & .new-channel-button {
    background-color: #0d6efd;
    color: black;
    border-radius: 8px;
    cursor: pointer;
    transform: translate(0.3);
    border: none;
    font-weight: bold;
    font-size: 18px;
    padding: 5px;
    width: 72%;
    font-weight: bold;
    font-size: 18px;
  }

  & .new-channel-button:disabled {
    opacity: 0.5;
    cursor: default;
    border: none;
  }
`;

const Container = styled.div`
  grid-column: 4;
  grid-row: 1;

  & .screen-share {
    font-size: 20px;
    color: #2e86ab;
  }

  & .screen-share:hover {
    color: green;
    cursor: pointer;
  }
`;

export default ScreenShare;
