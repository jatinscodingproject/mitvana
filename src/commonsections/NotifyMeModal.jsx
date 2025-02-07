import { postNotifyEmail } from "@src/api/services/subscribeService";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const NotifyMeModal = ({
  modalShow,
  handleNotifyMeModalClose,
  selectedProductId,
}) => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async() => {
    // Handle email submission logic here, e.g., sending it to a server
    console.log("User's Email:", email , selectedProductId);
    const obj = {
        email , productId : selectedProductId
    }
    await postNotifyEmail(obj)
    handleNotifyMeModalClose(); // Close the modal
  };

  return (
    <Modal
      show={modalShow}
      onHide={handleNotifyMeModalClose}
      centered
      className="fade modal-overl mx-auto quickViewModall"
    >
      <Modal.Body>
        <h5 className="text-center mb-4">Notify Me</h5>
        <Form>
          <Form.Group controlId="emailInput">
            <Form.Label>Enter your email to get notified:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              onClick={handleEmailSubmit}
              disabled={!email.trim()}
            >
              Notify Me
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NotifyMeModal;
