import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, BadgeCheck } from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function VerifyCode() {
  const navigate = useNavigate();
  const email = localStorage.getItem("humsafarEmail") || "your university email";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    if (code !== "123456") {
      setError("Incorrect code. For demo, use 123456.");
      return;
    }

    localStorage.setItem("humsafarVerified", "true");
    navigate("/role");
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
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
          style={{ marginTop: "70px" }}
        >
          <h1 style={{ fontSize: "38px", lineHeight: "1.1", marginBottom: "12px" }}>
            Enter verification code
          </h1>

          <p className="muted-text">
            A 6-digit code was sent to <b>{email}</b>.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleVerify}
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "34px" }}
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
                setError("");
              }}
            />
          </div>

          <div className="chip" style={{ marginBottom: "16px" }}>
            Demo code: 123456
          </div>

          {error && (
            <p style={{ color: "#e11d48", fontSize: "13px", fontWeight: 700 }}>
              {error}
            </p>
          )}

          <Button type="submit">Verify and continue</Button>
        </motion.form>
      </div>
    </ScreenWrapper>
  );
}

export default VerifyCode;