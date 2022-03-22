import { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import electronApi from "services/electronApi";
import { screenContext } from "context/screenShareContext";

function ScreenShare() {
  const { setUserVideo, userVideo, setWatchingStream } =
    useContext(screenContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [screens, setScreens] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClickScreenIcon = async () => {
    const screens = await window.App.getVideoSource();
    console.log(screens);
    setScreens(screens);
    openModal();
  };

  const startStreaming = async (source) => {
    const constrains = {
      audio: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: source.id,
        },
      },
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: source.id,
          minHeight: 720,
          maxFrameRate: 60,
          minWidth: 1280,
        },
      },
    };
    const stream = await navigator.mediaDevices.getUserMedia(constrains);
    setUserVideo(stream);
    console.log(stream);
    setWatchingStream(true);
    closeModal();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      background: "#4b5166",
      height: "50%",
    },
  };

  return (
    <>
      <Container>
        <i
          onClick={() => onClickScreenIcon()}
          className="screen-share fa-solid fa-desktop"
        ></i>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3>Select a Screen to Share</h3>
          <ModalContainer>
            {screens.map((src) => (
              <div
                className="source-select"
                onClick={() => startStreaming(src)}
              >
                <img
                  className="thumbnail-img"
                  src={src.thumbnailImg}
                  alt="screen-thumbnails"
                />
                <h5 className="screen-title">{src.name}</h5>
              </div>
            ))}
          </ModalContainer>
        </Modal>
      </Container>
    </>
  );
}

const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  color: white;
  cursor: pointer;
  text-align: center;

  & .screen-title {
    font-size: 19px;
  }

  & .thumbnail-img {
    width: 80%;
    margin-left: 30px;
    margin-top: 30px;
  }
  & .source-select:hover {
    border: 1px solid yellow;
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
