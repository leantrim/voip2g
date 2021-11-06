import React, { Component, useEffect, useState } from "react";
import CreateChannel from "./backend/createChannel";
import firebase, { auth, db } from "../../Firebase/firebase";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";

function NewChannel(props) {
  /* MODAL STUFF */
  const [show, setShow] = useState(false);
  const router = useRouter();

  const [channelsSnapshot] = useCollection(
    db
      .collection("chats")
      .doc("channels")
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const handleClose = () => {
    console.log(name, props.useri.email, props.useri.uid);
    db.collection("channels").add({
      datecreated: firebase.firestore.FieldValue.serverTimestamp(),
      channel_name: name,
      channel_creator: props.useri.email,
      channel_creator_userid: props.useri.uid,
    });

    setShow(false);
    console.log(handleClose);
  };
  const handleExit = () => {
    console.log(handleExit);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  /* END OF MODAL STUFF */

  /* FORM STUFF */
  const [name, setName] = useState("");

  /* END OF FORM */

  return (
    <>
      <div className="container">
        <i
          style={{ cursor: "pointer" }}
          className="fas fa-plus fa-3x position-absolute top-0 start-0 text-success mt-10"
          variant="primary"
          onClick={handleShow}
        ></i>
      </div>

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
          <h5>Do you want this channel to be permenant?</h5>
        <fieldset class="form-group">
        <div class="row">
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
              <label class="form-check-label" for="gridRadios1">
                Yes
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
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
