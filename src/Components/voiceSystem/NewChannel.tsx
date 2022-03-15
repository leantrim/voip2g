import { useContext, useState } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import chan from "services/channelService";
import { channelContext } from "context/channelContext";

interface IFormInputs {
  channelName: string;
  isChat: boolean;
  author: string;
  name: string;
}

function NewChannel() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { loadChannels } = useContext(channelContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  // Modal fnctions
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

  const openModal = () => {
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  interface Channel {
    channelName: string;
    name: string;
    author: string;
    isChat: boolean;
  }

  const viewModelToDb = (data: Channel) => {
    console.log(data);
    const dataReturn = {
      name: data.channelName,
      isChat: data.isChat,
      author: "Lean",
    };
    return dataReturn;
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log(data);
    const datatoSend = viewModelToDb(data);
    console.log("returned data", datatoSend);
    await chan.createChannel(datatoSend);
    closeModal();
    loadChannels();
  };

  const displayError = (type: any) => {
    if (type) {
      switch (type) {
        case "minLength":
          return "Channel name needs to be atleast 3 characters long...";

        case "maxLength":
          return "Channel name cannot be longer than 16 characters long...";

        case "required":
          return "Channel name is required...";

        default:
          break;
      }
    }
  };

  return (
    <Container>
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
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="modal-topic">Channel Name</h5>
            <input
              className="channel-name-input"
              {...register("channelName", {
                required: true,
                minLength: 3,
                maxLength: 16,
              })}
            />
            <div className="errors">
              {displayError(errors.channelName?.type)}
            </div>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                {...register("isChat", { required: false })}
              />
              <div className="label-text">Is chat</div>
            </label>
            <input className="submit-button" type="submit" />
          </Form>
        </Modal>
      </ModalContainer>
    </Container>
  );
}

const Form = styled.form`
  display: grid;
  margin: 104px;
  grid-template-rows: repeat(4, 3em);
  grid-gap: 15px;

  & .submit-button {
    background-color: #103544;
    outline: none;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 18px;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
    cursor: pointer;
  }

  & .checkbox {
    height: 25px;
    width: 26px;
    color: #1b1e27;
  }

  & .modal-topic {
    font-size: 18px;
    color: #2e86ab;
  }

  & .channel-name-input {
    background-color: #103544;
    border: none;
    outline: none;
    color: #f3f3f3;
    font-size: 18px;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  }
`;

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
  cursor: pointer;
  background-color: #2b2d3a;
  grid-row: 1;

  & .header-title {
    font-size: 17px;
    text-align: start;
    margin-top: 10px;
    margin-left: 10px;
    color: #3ba6d3;
  }
`;

export default NewChannel;
