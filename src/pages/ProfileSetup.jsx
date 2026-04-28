import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  School,
  UserRound,
  Music,
  ShieldCheck,
} from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function ProfileSetup() {
  const navigate = useNavigate();
  const role = localStorage.getItem("humsafarRole") || "passenger";
  const savedEmail = localStorage.getItem("humsafarEmail") || "";

  const [form, setForm] = useState({
    name: "",
    email: savedEmail,
    phone: "",
    direction: "To Campus",
    campus: "Main Campus",
    address: "",
    day: "Monday",
    startTime: "11:40",
    endTime: "3:45",
    genderPreference: "No preference",
    musicPreference: "Music friendly",
    carName: "",
    carNumber: "",
    seats: "3",
    fare: "350",
  });

  const [error, setError] = useState("");

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      setError("Please fill name, phone, and location address.");
      return;
    }

    if (role === "rider" && (!form.carName || !form.carNumber || !form.fare)) {
      setError("Please fill car details and fare.");
      return;
    }

    const profileData = {
      ...form,
      role,
      pickup:
        form.direction === "To Campus" ? form.address : form.campus,
      dropoff:
        form.direction === "To Campus" ? form.campus : form.address,
    };

    localStorage.setItem("humsafarProfile", JSON.stringify(profileData));

    if (role === "passenger") {
      navigate("/passenger");
    } else {
      navigate("/rider");
    }
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
          <div className="logo-mark">
            <UserRound size={25} />
          </div>

          <span className="chip">
            <ShieldCheck size={14} />
            {role === "passenger" ? "Passenger setup" : "Rider setup"}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1 style={{ fontSize: "34px", lineHeight: "1.1", marginBottom: "10px" }}>
            Set up your ride profile
          </h1>

          <p className="muted-text">
            Add your route, schedule, and preferences for a smooth campus ride.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ marginTop: "22px" }}
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
            <label>University Email</label>
            <input
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              placeholder="e.g. 0300-1234567"
              value={form.phone}
              onChange={(e) => updateForm("phone", e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Ride Direction</label>
            <select
              value={form.direction}
              onChange={(e) => updateForm("direction", e.target.value)}
            >
              <option>To Campus</option>
              <option>From Campus</option>
            </select>
          </div>

          <div className="input-group">
            <label>Campus</label>
            <select
              value={form.campus}
              onChange={(e) => updateForm("campus", e.target.value)}
            >
              <option>Main Campus</option>
              <option>City Campus</option>
            </select>
          </div>

          <div className="input-group">
            <label>
              {form.direction === "To Campus"
                ? "Pickup Location"
                : "Drop-off Location"}
            </label>
            <input
              placeholder={
                form.direction === "To Campus"
                  ? "e.g. Gulshan-e-Iqbal, Block 13"
                  : "e.g. DHA Phase 6, Karachi"
              }
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
            />
          </div>

          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, #ecfeff, #fff7ed)",
              boxShadow: "none",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div className="logo-mark" style={{ width: "42px", height: "42px" }}>
                <Navigation size={20} />
              </div>

              <div>
                <b>Demo map preview</b>
                <p className="muted-text" style={{ margin: "4px 0 0", fontSize: "13px" }}>
                  {form.direction === "To Campus"
                    ? `${form.address || "Your pickup location"} → ${form.campus}`
                    : `${form.campus} → ${form.address || "Your drop-off location"}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="secondary-btn"
              style={{ marginTop: "14px", padding: "12px" }}
              onClick={() =>
                updateForm(
                  "address",
                  form.direction === "To Campus"
                    ? "Gulshan-e-Iqbal, Block 13, Karachi"
                    : "DHA Phase 6, Karachi"
                )
              }
            >
              <MapPin size={15} style={{ verticalAlign: "middle" }} /> Use demo pinned location
            </button>
          </div>

          <div className="input-group">
            <label>Day</label>
            <select value={form.day} onChange={(e) => updateForm("day", e.target.value)}>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => updateForm("startTime", e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>End Time</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => updateForm("endTime", e.target.value)}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Gender Preference</label>
              <select
                value={form.genderPreference}
                onChange={(e) => updateForm("genderPreference", e.target.value)}
              >
                <option>No preference</option>
                <option>Female preferred</option>
                <option>Male preferred</option>
              </select>
            </div>

            <div className="input-group">
              <label>Music Preference</label>
              <select
                value={form.musicPreference}
                onChange={(e) => updateForm("musicPreference", e.target.value)}
              >
                <option>Music friendly</option>
                <option>Quiet ride</option>
                <option>No preference</option>
              </select>
            </div>
          </div>

          {role === "rider" && (
            <>
              <div className="input-group">
                <label>Car Name / Model</label>
                <input
                  placeholder="e.g. Honda City"
                  value={form.carName}
                  onChange={(e) => updateForm("carName", e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Car Number</label>
                <input
                  placeholder="e.g. ABC-123"
                  value={form.carNumber}
                  onChange={(e) => updateForm("carNumber", e.target.value)}
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Seats Available</label>
                  <input
                    type="number"
                    value={form.seats}
                    onChange={(e) => updateForm("seats", e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Fare per Seat</label>
                  <input
                    type="number"
                    value={form.fare}
                    onChange={(e) => updateForm("fare", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {error && (
            <p style={{ color: "#e11d48", fontSize: "13px", fontWeight: 700 }}>
              {error}
            </p>
          )}

          <Button type="submit">
            {role === "passenger" ? "Find available rides" : "Create rider profile"}
          </Button>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px" }}>
            <span className="chip">
              <School size={13} />
              {form.campus}
            </span>
            <span className="chip">
              <MapPin size={13} />
              {form.direction}
            </span>
            <span className="chip">
              <Music size={13} />
              {form.musicPreference}
            </span>
          </div>
        </motion.form>
      </div>
    </ScreenWrapper>
  );
}

export default ProfileSetup;