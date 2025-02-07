import {
  updateAddress,
  getAddress,
  deleteAddress,
} from "@src/api/services/userService";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Address() {
  const [showEdit, setShowEdit] = useState(false);
  const [addressId, setAddressId] = useState("");

  const [userAddress, setUserAddress] = useState([]);
  const [addressType, setAddressType] = useState("Home");

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { firstname, lastname, phone } = formData;

    if (!firstname || !lastname) {
      toast.dismiss();
      toast.error("First Name and Last Name are required");
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
      addressId,
      companyName,
      emailId: email,
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

    if (!obj?.pincode) {
      toast.dismiss();
      toast.error("Pincode required");
      return;
    }

    if (!obj?.phone) {
      toast.dismiss();
      toast.error("Phone required");
      return;
    }
    if (!obj?.emailId) {
      toast.dismiss();
      toast.error("Email required");
      return;
    }

    updateAddress(obj)
      .then(() => {
        toast.dismiss();
        toast.success("Address updated successfully");
        setShowEdit(false);
        getUserDetail();
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to update address");
        console.error("Update address error:", error);
      });
  };

  const getUserDetail = () => {
    getAddress()
      .then((res) => {
        setUserAddress(res?.address);
      })
      .catch((error) => {
        console.error("Update address error:", error);
      });
  };
  useEffect(() => {
    getUserDetail();
  }, {});

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

  const handleAddressTypeChange = (e) => {
    setAddressType(e.target.value);
  };

  const handleEditAddress = (item) => {
    console.log(item);
    setShowEdit(true);
    setAddressId(item?._id);
    setFormData({
      lastname: item?.lastName,
      firstname: item?.firstName,
      country: item?.country,
      streetAddress1: item?.address,
      streetAddress2: item?.address2,
      city: item?.city,
      state: item?.state,
      pincode: item?.postalCode,
      phone: item?.phoneNumber,
      email: item?.emailId,
      companyName: item?.companyName,
    });
  };

  const handleDeleteAddress = async (item) => {
    const res = await deleteAddress(item._id);
    console.log(res);

    if (res && res.success && res.success == true) {
      toast.dismiss();
      toast.success(res.message);
      getUserDetail();
    }
  };
  return (
    <div>
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="fw-bold fs-4 text-uppercase">Shipment Address</h2>
            {!showEdit && (
              <button
                className="button-bottom-border py-1"
                onClick={() => setShowEdit(true)}
              >
                Add Address
              </button>
            )}
          </div>
        </div>

        {showEdit ? (
          <div className="container mt-4">
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
              <div className="col-md-6 mb-3">
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
                  disabled={!showEdit}
                />
              </div>
              <div className="col-md-6 mb-3">
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
                />
                <input
                  type="text"
                  id="streetAddress2"
                  name="streetAddress2"
                  className="form-control mt-2"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={streetAddress2}
                  onChange={handleChange}
                  disabled={!showEdit}
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
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
                  disabled={!showEdit}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  disabled={!showEdit}
                />
              </div>
            </div>

            {showEdit && (
              <button
                className="custom-bg-2 fw-semibold px-3 py-2 tracking-wider"
                onClick={handleSave}
              >
                Save Address
              </button>
            )}
          </div>
        ) : (
          <div>
            {userAddress?.length > 0 &&
              userAddress.map((item, index) => {
                return (
                  <div
                    key={item?._id}
                    className="border p-3 rounded mt-3"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p className="fs-16 m-0">
                        {item?.firstName + " " + item?.lastName} |{" "}
                        {item?.addressType}
                      </p>
                      <p className="fs-13 m-0">
                        {item?.address},{" "}
                        {item?.address2 ? item?.address2 + "," : ""}
                        {item?.city}, {item?.state}, {item?.country} -{" "}
                        {item?.postalCode}
                      </p>
                      <p className="fs-13 m-0">Mob: {item?.phoneNumber}</p>
                    </div>

                    <div>
                      <button
                        className="button-bottom-border py-1 me-2"
                        onClick={() => handleEditAddress(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="button-bottom-border py-1 me-2"
                        onClick={() => handleDeleteAddress(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Address;
