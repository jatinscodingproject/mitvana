// import React, { useState } from "react";
// import { Offcanvas, Button, Form } from "react-bootstrap";
// import Link from "next/link";
// import {
//   requestPasswordRecover,
//   userRegister,
//   verifyUser,
// } from "@src/api/services/userService";
// import { toast } from "react-hot-toast";

// const RecoverPassword = ({ signupShow, handleSignUpClose }) => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!email) {
//         toast.error("Please Provide Email");
//       }

//       const obj = {
//         email,
//       };

//       const res = await requestPasswordRecover(obj);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <React.Fragment>
//       <Offcanvas show={signupShow} onHide={handleSignUpClose} placement="end">
//         <Offcanvas.Header className="border-bottom">
//           <h5
//             className="offcanvas-title fs-16 text-uppercase"
//             id="accountOffcanvasLabel"
//           >
//             RECOVER PASSWORD
//           </h5>
//           <button
//             type="button"
//             className="btn-close btn-close-none"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//             onClick={handleSignUpClose}
//           >
//             <i className="pe-7s-close pegk"></i>
//           </button>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Form onSubmit={handleSubmit} className="mb-4">
//             <Form.Group className="mb-3">
//               <Form.Label>
//                 Email <span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 id="emailInputOffcanvas"
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" className="btn btn-info w-100 rounded-pill">
//               SEND RECOVER URL ON MAIL
//             </Button>
//           </Form>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </React.Fragment>
//   );
// };
// export default RecoverPassword;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { requestPasswordRecover } from "@src/api/services/userService";
import { toast } from "react-hot-toast";

const RecoverPassword = ({ signupShow, handleSignUpClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.dismiss();
      toast.error("Please Provide Email");
      return;
    }

    try {
      const obj = { email };
      const res = await requestPasswordRecover(obj);
      if (res.success) {
        toast.dismiss();
        toast.success("Recovery email sent successfully");
        handleSignUpClose();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to send recovery email");
    }
  };

  return (
    <React.Fragment>
      <Modal show={signupShow} onHide={handleSignUpClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-16 text-uppercase">RECOVER PASSWORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>
                Email/Phone <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="btn btn-info w-100 rounded-pill">
              SUBMIT
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RecoverPassword;
