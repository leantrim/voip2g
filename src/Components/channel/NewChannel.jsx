import React, { useState } from "react";
import firebase, { db } from "../Firebase/firebase";
import { Button, Modal } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";

function NewChannel(props) {
  /* MODAL STUFF */
  const [show, setShow] = useState(false);

  /* Ej funktionel för tillfället */
  const [channelsSnapshot] = useCollection(
    db
      .collection("chats")
      .doc("channels")
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const handleClose = () => {
    /* Debugg Console Log */
    console.log(name, props.user.email, props.user.uid);
  
    db.collection("channels").add({
      datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      channel_name: name,
      channel_creator: props.user.email,
      channel_creator_userid: props.user.uid,
    });

    setShow(false);
  };
  const handleExit = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  /* END OF MODAL STUFF */

  /* FORM STUFF */
  const [name, setName] = useState("");

  /* END OF FORM */

  return (
    <>
        <h5
          // Plus knapp för att lägga till kanaler
          style={{ cursor: "pointer" }}
          className="fas fa-plus text-success"
          variant="primary"
          onClick={handleShow}
        >Skapa Ny Kanal</h5>

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
          <h5>Chatt Chanel?</h5>
          <fieldset class="form-group">
            <div class="row">
              <div class="col">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="option1"
                    checked
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
                    value="option2"
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
