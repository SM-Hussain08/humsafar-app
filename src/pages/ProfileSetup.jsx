import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserRound,
  MapPin,
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
  Car,
  Home,
  Camera,
  Upload,
} from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";
import { createUserAccount } from "../utils/userService";

function ProfileSetup() {
  const navigate = useNavigate();

  const pendingUser = JSON.parse(localStorage.getItem("humsafarPendingUser")) || {};
  const verified = localStorage.getItem("humsafarEmailVerified") === "true";

  const generatedErp = useMemo(() => {
    const existingErp = localStorage.getItem("humsafarGeneratedErp");

    if (existingErp) return existingErp;

    const newErp = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem("humsafarGeneratedErp", newErp);
    return newErp;
  }, []);

  const [form, setForm] = useState({
    name: pendingUser.name || localStorage.getItem("humsafarName") || "",
    email: pendingUser.email || localStorage.getItem("humsafarEmail") || "",
    erp: generatedErp,
    gender: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const quickAreas = [
    "Gulshan-e-Iqbal, Karachi",
    "DHA Phase 6, Karachi",
    "Clifton, Karachi",
    "North Nazimabad, Karachi",
    "PECHS, Karachi",
  ];

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
    setStatus({ type: "", text: "" });
  };

  const getInitials = () => {
    if (!form.name.trim()) return "HS";

    return form.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus({
        type: "error",
        text: "Please upload a valid image file.",
      });
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      updateForm("profilePhoto", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!verified) {
      return "Please verify your email before completing profile setup.";
    }

    if (
      !form.name ||
      !form.email ||
      !form.erp ||
      !form.gender ||
      !form.homeAddress ||
      !form.password ||
      !form.confirmPassword
    ) {
      return "Please complete all required profile fields.";
    }

    if (form.password.length < 6) {
      return "Password should be at least 6 characters.";
    }

    if (form.password !== form.confirmPassword) {
      return "Password and confirm password do not match.";
    }

    return "";
  };

  const buildBasicAccount = () => ({
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    erp: form.erp,
    gender: form.gender,
    homeAddress: form.homeAddress.trim(),
    password: form.password,
    profilePhoto: form.profilePhoto,
    isPassenger: true,
    hasRiderProfile: false,
  });

  const handleCreateAccount = async () => {
    const error = validateForm();

    if (error) {
      setStatus({ type: "error", text: error });
      return;
    }

    try {
      setLoading(true);

      const createdUser = await createUserAccount(buildBasicAccount());

      localStorage.setItem("humsafarCurrentUser", JSON.stringify(createdUser));
      localStorage.removeItem("humsafarPendingUser");
      localStorage.removeItem("humsafarRegisterMode");
      localStorage.removeItem("humsafarEmailVerified");
      localStorage.removeItem("humsafarGeneratedErp");

      setStatus({
        type: "success",
        text: "Account successfully created! You can now login as a passenger.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setStatus({
        type: "error",
        text: "Could not create account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRiderProfile = () => {
    const error = validateForm();

    if (error) {
      setStatus({ type: "error", text: error });
      return;
    }

    localStorage.setItem("humsafarBasicProfileDraft", JSON.stringify(buildBasicAccount()));
    navigate("/rider-profile-setup");
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
          <div className="logo-mark">
            <UserRound size={25} />
          </div>

          <span className="chip">
            <CheckCircle2 size={14} />
            Email verified
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="page-mini-label">
            <Home size={14} />
            Passenger account setup
          </div>

          <h1 style={{ fontSize: "34px", lineHeight: "1.1", marginBottom: "10px" }}>
            Complete your profile
          </h1>

          <p className="muted-text">
            Every Humsafar user starts as a passenger. You can add a rider profile
            now or later.
          </p>

          <div className="step-dots">
            <span className="step-dot active"></span>
            <span className="step-dot active"></span>
            <span className="step-dot active"></span>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "22px" }}
        >
          <h3 className="form-card-title">Basic details</h3>
          <p className="form-card-subtitle">
            This information will be used for your passenger profile.
          </p>

          <div className="profile-photo-section">
            <div className="avatar-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile preview" />
              ) : (
                <span>{getInitials()}</span>
              )}
            </div>

            <div className="photo-copy">
              <h3>Profile picture</h3>
              <p>Recommended for trust and safety, but optional for demo.</p>

              <label className="upload-photo-btn">
                <Upload size={15} />
                Upload photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>

            <Camera className="photo-floating-icon" size={18} />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              placeholder="e.g. Syed Hussain"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>University Email</label>
            <input value={form.email} disabled />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>ERP</label>
              <input value={form.erp} disabled />
              <p className="input-helper">
                Auto-fetched from university records against your email.
              </p>
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select
                value={form.gender}
                onChange={(e) => updateForm("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="map-picker">
            <div className="map-picker-head">
              <div>
                <h3>Home address</h3>
                <p>Choose your usual pickup/drop-off area.</p>
              </div>
              <MapPin size={22} />
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                placeholder="e.g. Gulshan-e-Iqbal, Block 13, Karachi"
                value={form.homeAddress}
                onChange={(e) => updateForm("homeAddress", e.target.value)}
              />
            </div>

            <div className="quick-area-grid">
              {quickAreas.map((area) => (
                <button
                  type="button"
                  key={area}
                  className={form.homeAddress === area ? "quick-area active" : "quick-area"}
                  onClick={() => updateForm("homeAddress", area)}
                >
                  {area.split(",")[0]}
                </button>
              ))}
            </div>

            <div className="fake-map">
              <div className="map-line line-one"></div>
              <div className="map-line line-two"></div>
              <div className="map-line line-three"></div>
              <div className="map-pin">
                <MapPin size={24} />
              </div>
              <div className="map-location-label">
                {form.homeAddress || "Select or type your home address"}
              </div>
            </div>

            <button
              type="button"
              className="secondary-btn"
              style={{ marginTop: "14px", padding: "12px" }}
              onClick={() =>
                updateForm("homeAddress", "Gulshan-e-Iqbal, Block 13, Karachi")
              }
            >
              Use demo pinned location
            </button>
          </div>

          <h3 className="form-card-title" style={{ marginTop: "20px" }}>
            Create password
          </h3>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrap">
              <LockKeyhole size={16} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-wrap">
              <LockKeyhole size={16} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {status.text && (
            <div className={status.type === "success" ? "success-box" : "error-box"}>
              {status.text}
            </div>
          )}

          <div style={{ display: "grid", gap: "12px" }}>
            <Button type="button" loading={loading} onClick={handleCreateAccount}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <Button type="button" variant="secondary" onClick={handleAddRiderProfile}>
              <Car size={16} style={{ verticalAlign: "middle", marginRight: "6px" }} />
              Add Rider Profile
            </Button>
          </div>

          <p className="form-footer-note">
            You can use this email and password to login after account creation.
          </p>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

export default ProfileSetup;