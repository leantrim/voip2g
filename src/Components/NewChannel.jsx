import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function NewChannel(props) {
  /* MODAL STUFF */
  const [show, setShow] = useState(false);

  const handleClose = () => {
    /* Debugg Console Log */
    console.log(name, props.user.email, props.user.uid, isChat);
    console.log(isChat);

    setShow(false);
  };
  const handleExit = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  /* END OF MODAL STUFF */

  /* FORM STUFF */
  const [name, setName] = useState("");
  const [isChat, setIsChat] = useState("");

  /* END OF FORM */

  return (
    <>
      <i
        // Plus knapp för att lägga till kanaler
        style={{ cursor: "pointer" }}
        className="fas fa-plus text-success"
        variant="primary"
        onClick={handleShow}
      ></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <i className="fas fa-headset fa-3x"></i>
          <Modal.Title>Skapa ny kanal</Modal.Title>
        </Modal.Header>
        <form>
          <label>
            Channel name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </form>
        <Modal.Body>
          <h5>Chat Channel?</h5>
          <fieldset class="form-group">
            <div class="row">
              <div class="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="true"
                    onChange={(e) => setIsChat(e.target.value)}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="false"
                    onChange={(e) => setIsChat(e.target.value)}
                    checked
                  />
                  <label class="form-check-label" for="gridRadios2">
                    No
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          Du håller nu på att skapa en ny kanal, var försiktig xD!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExit}>
            Avbryt
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Skapa Kanal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewChannel;
