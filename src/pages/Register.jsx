import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserPlus,
  Sparkles,
  ArrowLeft,
  MailCheck,
  AlertCircle,
} from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";
import { checkEmailExists } from "../utils/userService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  const [emailAvailable, setEmailAvailable] = useState(false);
  const [checking, setChecking] = useState(false);

  const isOfficialUniversityEmail = (email) => {
    const normalizedEmail = email.toLowerCase().trim();

    return (
      normalizedEmail.endsWith("@iba.edu.pk") ||
      normalizedEmail.endsWith("@student.iba.edu.pk")
    );
  };

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
    setStatus({ type: "", text: "" });
    setEmailAvailable(false);
  };

  const handleCheckEmail = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setStatus({
        type: "error",
        text: "Please enter your name and university email.",
      });
      return;
    }

    if (!form.email.includes("@")) {
      setStatus({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!isOfficialUniversityEmail(form.email)) {
      setStatus({
        type: "error",
        text: "Only official university emails can be used to create an account.",
      });
      return;
    }

    try {
      setChecking(true);

      const exists = await checkEmailExists(form.email);

      if (exists) {
        setStatus({
          type: "error",
          text: "An account with this email already exists. Please login instead.",
        });
        setEmailAvailable(false);
      } else {
        setStatus({
          type: "success",
          text: "Email available. You can now verify your university email.",
        });
        setEmailAvailable(true);
      }
    } catch (error) {
      setStatus({
        type: "error",
        text: "Could not check email right now. Please try again.",
      });
    } finally {
      setChecking(false);
    }
  };

  const handleVerifyEmail = () => {
    localStorage.setItem(
      "humsafarPendingUser",
      JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      })
    );

    localStorage.setItem("humsafarRegisterMode", "true");
    localStorage.setItem("humsafarEmail", form.email.trim().toLowerCase());
    localStorage.setItem("humsafarName", form.name.trim());

    navigate("/verify");
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <button className="plain-back" onClick={() => navigate("/login")}>
          <ArrowLeft size={17} />
          Back to login
        </button>

        <div className="screen-header" style={{ marginTop: "18px" }}>
          <div className="logo-mark">
            <UserPlus size={25} />
          </div>

          <span className="chip">
            <Sparkles size={14} />
            Create Account
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginTop: "30px" }}
        >
          <h1 style={{ fontSize: "36px", lineHeight: "1.1", marginBottom: "12px" }}>
            Start with your university identity
          </h1>

          <p className="muted-text">
            Enter your name and official university email. We’ll first check if
            an account already exists.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleCheckEmail}
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "26px" }}
        >
          <div className="input-group">
            <label>Full Name</label>
            <input
              placeholder="e.g. Syed Hussain"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Official University Email</label>
            <input
              type="email"
              placeholder="yourname@iba.edu.pk"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          <div className="info-box">
            <MailCheck size={17} />
            <span>
              Only official university emails can be used to create a Humsafar
              account.
            </span>
          </div>

          {status.text && (
            <div className={status.type === "success" ? "success-box" : "error-box"}>
              {status.type === "error" && <AlertCircle size={16} />}
              {status.text}
            </div>
          )}

          {!emailAvailable && (
            <Button type="submit" loading={checking}>
              {checking ? "Checking email..." : "Check email availability"}
            </Button>
          )}

          {emailAvailable && (
            <Button type="button" onClick={handleVerifyEmail}>
              Verify email and continue
            </Button>
          )}

          <p className="form-footer-note">
            Demo note: verification code will be <b>123456</b>.
          </p>
        </motion.form>
      </div>
    </ScreenWrapper>
  );
}

export default Register;