import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { userRegister, verifyUser } from "@src/api/services/userService";
import { setItem } from "@src/api/localStorage";
import { Toaster, toast } from "react-hot-toast";
import MamaLoader from "../Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignUpModal = ({ signupShow, handleSignUpClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordCriteria = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "At least one uppercase letter" },
    { regex: /[a-z]/, text: "At least one lowercase letter" },
    { regex: /\d/, text: "At least one number" },
    { regex: /[@$!%*?&]/, text: "At least one special character" },
  ];

  const validatePassword = (password) => {
    return passwordCriteria.map((criteria) => ({
      ...criteria,
      isValid: criteria.regex.test(password),
    }));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const obj = {
      email,
      verificationCode: otp,
    };
    try {
      const res = await verifyUser(obj);
      setisLoading(false);
      if (res.success) {
        handleSignUpClose();
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      setisLoading(false);
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be a 10-digit numeric value.");
      setisLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password)
      .filter((criteria) => !criteria.isValid)
      .map((criteria) => criteria.text);

    if (passwordErrors.length > 0) {
      toast.error("Password Criteria not met");
      setisLoading(false);
      return;
    }

    try {
      const obj = { name, email, password, phone };
      const res = await userRegister(obj);
      if (res.success) {
        setShowOtp(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Modal
      backdrop={showOtp ? "static" : true}
      show={signupShow}
      onHide={() => {
        setShowOtp(false);
        handleSignUpClose();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>SIGN-UP/REGISTER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <MamaLoader />
          </div>
        ) : showOtp ? (
          <Form onSubmit={handleOtpSubmit}>
            <Form.Group>
              <Form.Label>OTP Sent to your email *</Form.Label>
              <Form.Control
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <small className="text-muted d-block mt-2">
              Note: If you do not receive the email, please check your spam/junk
              folder or try resending the OTP.
            </small>
            <Button
              type="submit"
              className="btn btn-info w-50 rounded-pill mt-4"
            >
              SUBMIT
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password *</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ul className="mt-2 list-unstyled">
                {validatePassword(password).map((criteria, index) => (
                  <li
                    key={index}
                    style={{ color: criteria.isValid ? "green" : "red" }}
                  >
                    {criteria.text}
                  </li>
                ))}
              </ul>
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-info w-50 rounded-pill"
              style={{
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
              }}
            >
              SIGN UP
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Toaster />
    </Modal>
  );
};

export default SignUpModal;
