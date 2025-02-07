import {
  changePasswordUser,
  updateUserDetails,
  getUserDetail,
} from "@src/api/services/userService";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function AccountDetails() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone:"",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [initialFormData, setInitialFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { confirmPassword, newPassword, firstname, lastname, email } =
      formData;
    let hasChanges = false;

    const name = `${firstname} ${lastname}`.trim();

    if (
      firstname !== initialFormData.firstname ||
      lastname !== initialFormData.lastname ||
      email !== initialFormData.email
    ) {
      hasChanges = true;
      try {
        const updateObj = {
          name,
          email,
        };
        await updateUserDetails(updateObj);
        toast.dismiss();
        toast.success("Details updated successfully");
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(error.message || "Failed to update details");
      }
    }

    if (confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.dismiss();
        toast.error("Password and Confirm Password Not matching");
        return;
      }
      try {
        const passwordObj = {
          newPassword: confirmPassword,
        };
        const res = await changePasswordUser(passwordObj);

        toast.dismiss();
        toast.success("Password changed successfully");
        resetPasswordFields();
        hasChanges = true;
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error(error.message || "Failed to change password");
      }
    }

    if (!hasChanges) {
      toast.dismiss();
      toast.error("No changes detected");
    }
  };

  const resetPasswordFields = () => {
    setFormData((prevData) => ({
      ...prevData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await getUserDetail();
        console.log(res)
        const fullName = res?.name?.split(" ") || [];
        const firstName = fullName[0] || "";
        const lastName =
          fullName.length > 1 ? fullName[fullName.length - 1] : "";

        setFormData({
          firstname: firstName,
          lastname: lastName,
          email: res?.email || "",
          phone: res?.phone || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setInitialFormData({
          firstname: firstName,
          lastname: lastName,
          email: res?.email || "",
          phone: res?.phone || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
  }, []);

  const { firstname, lastname, email,phone, newPassword, confirmPassword } = formData;

  return (
    <div>
      <Toaster />
      <div className="container mt-4 small">
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="form-control"
              value={firstname}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="form-control"
              value={lastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 mb-3">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              className="form-control"
              value={phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
        </div>

        <p className="fw-semibold mb-4 fs-5">Password Change</p>
        {/* <div className="row mb-3">
          <div className="col-12 mb-3">
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="form-control"
              value={currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
            />
          </div>
        </div> */}
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-control"
              value={newPassword}
              onChange={handleChange}
              placeholder="New Password"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 mb-3">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
            />
          </div>
        </div>

        <button
          className="custom-bg-2 fw-semibold px-3 py-2 tracking-wider"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
