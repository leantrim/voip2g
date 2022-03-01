import { useState } from "react";
import Joi from "joi";
import Modal from "react-modal";
import "../styles/NewChannel.css";
import useForm from "./common/Form";
import chan from "../services/channelService";

interface newchannel {
  name: string;
}

function NewChannel() {
  const [modalIsOpen, setIsOpen] = useState(false);

  // Form
  const [errors, setErrors] = useState<any>();
  const data = { name: "" };
  const style = "new-channel";

  const joiSchema = Joi.object({
    name: Joi.string().min(3).required().label("channel-name"),
  });

  // Modal functions
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
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

  // Form
  const doSubmit = async (data: newchannel) => {
    try {
      await chan.createChannel(data);
      console.log(data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errors = error.response.data;
        setErrors(errors);
      }
    }
  };

  const { renderButton, renderInput, handleSubmit } = useForm<newchannel>({
    initialData: data,
    joiSchema,
    doSubmit,
    style,
  });

  return (
    <div>
      <span onClick={openModal} className="create-new-channel">
        <i className="plus-sign fa-solid fa-plus"></i>
        <i className="new-channel-text">Create a new channel</i>
      </span>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit} className={style + "-form-container"}>
          <h1 className={style + `-createChannel-title`}> Create Channel</h1>
          {errors && <h4 className={`${style}-errorresponse`}>{errors}</h4>}
          {renderInput("name", "Channel Name")}
          {renderButton("CREATE CHANNEL")}
        </form>
      </Modal>
    </div>
  );
}

export default NewChannel;
