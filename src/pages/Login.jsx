import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  ShieldCheck,
  LockKeyhole,
  UserPlus,
  Eye,
  EyeOff,
} from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";
import { loginUser } from "../utils/userService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
    setStatus({ type: "", text: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setStatus({
        type: "error",
        text: "Please enter your email and password.",
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

    try {
      setLoading(true);

      const result = await loginUser(form.email.trim(), form.password);

      if (!result.success) {
        setStatus({
          type: "error",
          text: result.message,
        });
        return;
      }

      localStorage.setItem("humsafarCurrentUser", JSON.stringify(result.user));
      localStorage.setItem("humsafarLoggedIn", "true");

      setStatus({
        type: "success",
        text: "Login successful. Loading your dashboard...",
      });

      setTimeout(() => {
        navigate("/home");
      }, 900);
    } catch (error) {
      setStatus({
        type: "error",
        text: "Could not login right now. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
          style={{ marginTop: "46px" }}
        >
          <h1 style={{ fontSize: "38px", lineHeight: "1.1", marginBottom: "12px" }}>
            Welcome back to Humsafar
          </h1>

          <p className="muted-text">
            Login with the email and password you used while creating your account.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleLogin}
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "30px" }}
        >
          <div className="input-group">
            <label>University Email</label>
            <input
              type="email"
              placeholder="yourname@iba.edu.pk"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrap">
              <LockKeyhole size={16} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {status.text && (
            <div className={status.type === "success" ? "success-box" : "error-box"}>
              {status.text}
            </div>
          )}

          <Button type="submit" loading={loading}>
            {loading ? "Checking account..." : "Login"}
          </Button>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="create-account-btn"
            onClick={() => navigate("/register")}
          >
            <UserPlus size={17} />
            Don’t have an account? Create Account
          </button>
        </motion.form>

        <p className="muted-text" style={{ fontSize: "13px", textAlign: "center" }}>
          Only registered Humsafar users can login.
        </p>
      </div>
    </ScreenWrapper>
  );
}

export default Login;