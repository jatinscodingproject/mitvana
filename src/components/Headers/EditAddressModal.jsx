import React, { useEffect, useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import Link from "next/link";
import SignUpModal from "./SignupModal";
import { loginUser, updateAddress } from "@src/api/services/userService";

import toast, { Toaster } from "react-hot-toast";

const EditAddressModal = ({
  editAddressShow,
  handleEditAddressClose,
  addressDetail,
  getUserDetail,
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    companyName: "",
    country: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    companyName: "",
  });
  const [addressType, setAddressType] = useState("Home");
  const [phoneError, setPhoneError] = useState("");
  useEffect(() => {
    if (addressDetail) {
      setFormData({
        lastname: addressDetail?.lastName,
        firstname: addressDetail?.firstName,
        country: addressDetail?.country,
        streetAddress1: addressDetail?.address,
        streetAddress2: addressDetail?.address2,
        city: addressDetail?.city,
        state: addressDetail?.state,
        pincode: addressDetail?.postalCode,
        phone: addressDetail?.phoneNumber,
        email: addressDetail?.emailId,
        companyName: addressDetail?.companyName,
      });
    }
  }, [addressDetail]);

  const handleSave = () => {
    if (phoneError.length > 0) {
      toast.dismiss();
      toast.error("Phone number must be at least 10 digits");
      return;
    }
    const obj = {
      address: formData.streetAddress1,
      address2: formData.streetAddress2,
      addressType: addressType,
      city: formData.city,
      state: formData.state,
      phoneNumber: formData.phone,
      firstName: formData.firstname,
      lastName: formData.lastname,
      postalCode: formData.pincode,
      country: formData.country,
      addressId: addressDetail?._id,
    };

    if (!obj?.country) {
      toast.dismiss();
      toast.error("Country required");
      return;
    }

    if (!obj?.address) {
      toast.dismiss();
      toast.error("Street Address required");
      return;
    }

    if (!obj?.city) {
      toast.dismiss();
      toast.error("City required");
      return;
    }

    if (!obj?.state) {
      toast.dismiss();
      toast.error("State required");
      return;
    }

    if (!obj?.postalCode) {
      toast.dismiss();
      toast.error("Pincode required");
      return;
    }

    if (!obj?.phoneNumber) {
      toast.dismiss();
      toast.error("Phone required");
      return;
    }

    updateAddress(obj)
      .then(() => {
        toast.dismiss();
        toast.success("Address updated successfully");
        handleEditAddressClose();
        window.location.reload()
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to update address");
        console.error("Update address error:", error);
      });
  };
  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length < 10) {
        setPhoneError("Phone number must be at least 10 digits");
      } else {
        setPhoneError("");
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {
    firstname,
    lastname,
    companyName,
    country,
    streetAddress1,
    streetAddress2,
    city,
    state,
    pincode,
    phone,
    email,
  } = formData;
  return (
    <React.Fragment>
      <Offcanvas
        show={editAddressShow}
        onHide={handleEditAddressClose}
        placement="end"
      >
        <Offcanvas.Header className="border-bottom">
          <h5
            className="offcanvas-title fs-16 text-uppercase"
            id="accountOffcanvasLabel"
          >
            {addressDetail ? "EDIT" : "ADD"} ADDRESS
          </h5>
          <button
            type="button"
            className="btn-close btn-close-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleEditAddressClose}
          >
            <i className="pe-7s-close pegk"></i>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="">
            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label className="form-label fw-semibold">Address Type</label>
                <div>
                  <input
                    type="radio"
                    id="home"
                    name="addressType"
                    value="Home"
                    checked={addressType === "Home"}
                    onChange={handleAddressTypeChange}
                  />
                  <label htmlFor="home" className="ms-2 me-3">
                    Home
                  </label>

                  <input
                    type="radio"
                    id="office"
                    name="addressType"
                    value="Office"
                    checked={addressType === "Office"}
                    onChange={handleAddressTypeChange}
                  />
                  <label htmlFor="office" className="ms-2">
                    Office
                  </label>
                </div>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="firstname" className="form-label fw-semibold">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="form-control"
                  value={firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="lastname" className="form-label fw-semibold">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="form-control"
                  value={lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="companyName" className="form-label fw-semibold">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="form-control"
                  value={companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="country" className="form-label fw-semibold">
                  Country / Region*
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-control"
                  value={country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label
                  htmlFor="streetAddress1"
                  className="form-label fw-semibold"
                >
                  Street Address*
                </label>
                <input
                  type="text"
                  id="streetAddress1"
                  name="streetAddress1"
                  className="form-control"
                  placeholder="House number and Street name"
                  value={streetAddress1}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id="streetAddress2"
                  name="streetAddress2"
                  className="form-control mt-2"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={streetAddress2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="city" className="form-label fw-semibold">
                  Town / City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  value={city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="state" className="form-label fw-semibold">
                  State*
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="form-control"
                  value={state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="pincode" className="form-label fw-semibold">
                  Pincode*
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="form-control"
                  value={pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone*
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={phone}
                  onChange={handleChange}
                />
                {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Alternative Phone
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="custom-bg-2 fw-semibold px-3 py-2 tracking-wider"
              onClick={handleSave}
            >
              {addressDetail ? "Edit" : "Add"} Address
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Toaster />
    </React.Fragment>
  );
};
export default EditAddressModal;
