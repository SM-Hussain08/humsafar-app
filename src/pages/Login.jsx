import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendCode = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your university email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("humsafarEmail", email);
    navigate("/verify");
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
          <div className="logo-mark">
            <Mail size={25} />
          </div>

          <span className="chip">
            <ShieldCheck size={14} />
            Secure login
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginTop: "70px" }}
        >
          <h1 style={{ fontSize: "38px", lineHeight: "1.1", marginBottom: "12px" }}>
            Enter through your university email
          </h1>

          <p className="muted-text">
            We’ll send a verification code to continue your Humsafar journey.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSendCode}
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "34px" }}
        >
          <div className="input-group">
            <label>University Email</label>
            <input
              type="email"
              placeholder="yourname@iba.edu.pk"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#e11d48", fontSize: "13px", fontWeight: 700 }}>
              {error}
            </p>
          )}

          <Button type="submit">Send verification code</Button>

          <p className="muted-text" style={{ fontSize: "13px", marginBottom: 0 }}>
            Demo note: we’ll use a fixed code on the next screen.
          </p>
        </motion.form>
      </div>
    </ScreenWrapper>
  );
}

export default Login;