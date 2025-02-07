import Header from "@src/components/Headers/Header";
import React, { useEffect, useState } from "react";
import FooterCosmetics from "@src/components/FooterCosmetics";
import HeaderCosmetics from "@src/components/HeaderCosmetics";
import { useSearchParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { resetPasswordAPI, requestPasswordRecover } from "@src/api/services/userService";
import NewFooter from "@src/components/new_footer";

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState(email);

  // Handle password submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.dismiss();
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await resetPasswordAPI({ token, email, newPassword });
      if (res.status === 400 || res.data?.error === "Invalid token") {
        setIsTokenInvalid(true);
        toast.dismiss();
        toast.error("Invalid or expired token. Please try again.");
      } else {
        toast.dismiss();
        toast.success("Password reset successfully.");
      }
    } catch (error) {
      setIsTokenInvalid(true);
      console.log(error)
    }
  };

  const handleResendEmail = async () => {
    // e.preventDefault();
    // if (!email) {
    //   toast.error("Please Provide Email");
    //   return;
    // }

    try {
      const obj = { email };
      const res = await requestPasswordRecover(obj);
      if (res.success) {
        toast.dismiss();
        toast.success("Recovery email sent successfully");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to send recovery email");
    }
  };

  return (
    <>
      <HeaderCosmetics />
      <div className="custom-bg px-5 py-3 custom-text px-md-10">
        <h1 className="afacad-flux fs-1 text-center fw-medium display-5">
          Reset Password
        </h1>
      </div>
      {isTokenInvalid ? <div className="flex flex-col items-center justify-center w-full h-[60vh]">
        <h3 className="afacad-flux text-lg text-red-600 mb-20">
          Your Token is Invalid or Expired. <button className="text-[#56cfe1] font-semibold underline" onClick={handleResendEmail}>Resend Email</button>
        </h3>
      </div> :
        <div className="ps-lg-5 pe-lg-5 pt-lg-5 pb-lg-5 p-md-5 ps-2 pe-2 pt-4 custom-text">
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="btn btn-teal my-3 px-5 py-3 fw-bold w-100 rounded-pill mb-3"
                  >
                    Reset Password
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>}
      <FooterCosmetics />
      <Toaster />
    </>
  );
}

export default ResetPassword;
