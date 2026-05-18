import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, BadgeCheck, ArrowLeft } from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function VerifyCode() {
  const navigate = useNavigate();

  const email = localStorage.getItem("humsafarEmail") || "your university email";
  const registerMode = localStorage.getItem("humsafarRegisterMode") === "true";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();

    if (code !== "123456") {
      setStatus({
        type: "error",
        text: "Incorrect code. For demo, use 123456.",
      });
      return;
    }

    setLoading(true);

    localStorage.setItem("humsafarEmailVerified", "true");

    setStatus({
      type: "success",
      text: registerMode
        ? "Email verified. Continue to complete your profile."
        : "Login verified. Choose how you want to use Humsafar.",
    });

    setTimeout(() => {
      if (registerMode) {
        navigate("/profile");
      } else {
        navigate("/role");
      }
    }, 850);
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <button
          className="plain-back"
          onClick={() => navigate(registerMode ? "/register" : "/login")}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="screen-header" style={{ marginTop: "18px" }}>
          <div className="logo-mark">
            <KeyRound size={25} />
          </div>

          <span className="chip">
            <BadgeCheck size={14} />
            Code sent
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginTop: "42px" }}
        >
          <h1 style={{ fontSize: "38px", lineHeight: "1.1", marginBottom: "12px" }}>
            Verify your email
          </h1>

          <p className="muted-text">
            A 6-digit verification code was sent to <b>{email}</b>.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleVerify}
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "30px" }}
        >
          <div className="input-group">
            <label>Verification Code</label>
            <input
              type="text"
              placeholder="Enter 123456"
              value={code}
              maxLength="6"
              onChange={(e) => {
                setCode(e.target.value);
                setStatus({ type: "", text: "" });
              }}
            />
          </div>

          <div className="chip" style={{ marginBottom: "16px" }}>
            Demo code: 123456
          </div>

          {status.text && (
            <div className={status.type === "success" ? "success-box" : "error-box"}>
              {status.text}
            </div>
          )}

          <Button type="submit" loading={loading}>
            {loading ? "Verifying..." : "Verify and continue"}
          </Button>
        </motion.form>
      </div>
    </ScreenWrapper>
  );
}

export default VerifyCode;