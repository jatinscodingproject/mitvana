import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Link from "next/link";
import SignUpModal from "./SignupModal";
import { loginUser } from "@src/api/services/userService";
import RecoverPassword from "./RecoverPassword";
import { getItem, removeItemByKey } from "@src/api/localStorage";
import MamaLoader from "../Loader";

const LoginModal = ({ loginShow, handleLoginClose }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrPhoneTouched, setEmailOrPhoneTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  const [recoverPasswordShow, setRecoverPasswordShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleSignUpClose = () => {
    setSignupShow(false);
  };
  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    const parsedCartFromLocalStorage = getItem("cartItem");
    try {
      const data = {
        emailOrPhone,
        password,
        cartItem: parsedCartFromLocalStorage,
        totalCartPrice: getItem("totalCartPrice"),
      };

      const res = await loginUser(data);

      if (res.success) {
        handleLoginClose();
        if (res?.order) {
          location.href = `/checkout?order=${res.order._id}`;
        }
        removeItemByKey("cartItem");
        removeItemByKey("totalCartPrice");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleSignUpOpen = () => {
    setSignupShow(true);
    handleLoginClose();
  };

  const handleRecoverPasswordClose = () => {
    setRecoverPasswordShow(false);
  };

  const handleRecoverPasswordOpen = () => {
    setRecoverPasswordShow(true);
    handleLoginClose();
  };

  return (
    <React.Fragment>
      <Modal show={loginShow} onHide={handleLoginClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-16 text-uppercase">LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MamaLoader />
            </div>
          ) : (
            <>
              <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email or Phone <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    onBlur={() => setEmailOrPhoneTouched(true)}
                    placeholder="Enter your email or phone number"
                    required
                  />
                  {emailOrPhoneTouched && !emailOrPhone && (
                    <p className="mt-2 text-[.7rem] text-red-600">
                      *Email or phone number field cannot be empty
                    </p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3 pb-1">
                  <Form.Label>
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    autoComplete="off"
                    required
                  />
                  {passwordTouched && !password && (
                    <p className="mt-2 text-[.7rem] text-red-600">
                      *Password field cannot be empty
                    </p>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  className="btn btn-info w-100 rounded-pill"
                >
                  SIGN IN
                </Button>
              </Form>
              <p className="text-muted">
                New customer?{" "}
                <Link
                  href="#register"
                  className="product-title"
                  onClick={handleSignUpOpen}
                >
                  Create your account
                </Link>
              </p>
              <p className="text-muted">
                Lost password?{" "}
                <Link
                  href="#recover-password"
                  className="product-title"
                  onClick={handleRecoverPasswordOpen}
                >
                  FORGOT PASSSWORD
                </Link>
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>

      <SignUpModal
        signupShow={signupShow}
        handleLoginClose={handleLoginClose}
        handleSignUpClose={handleSignUpClose}
      />
      <RecoverPassword
        signupShow={recoverPasswordShow}
        handleLoginClose={handleLoginClose}
        handleSignUpClose={handleRecoverPasswordClose}
      />
    </React.Fragment>
  );
};

export default LoginModal;
