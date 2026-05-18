import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  LogOut,
  MapPin,
  UserRound,
  BadgeCheck,
  School,
} from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function HomeDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("humsafarCurrentUser"));

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(savedUser);
  }, [navigate]);

  const getInitials = () => {
    if (!user?.name) return "HS";

    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("humsafarCurrentUser");
    localStorage.removeItem("humsafarLoggedIn");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
          <div className="logo-mark">
            <Car size={25} />
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </button>
        </div>

        <motion.div
          className="dashboard-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="dashboard-avatar">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.name} />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>

          <div>
            <div className="chip">
              <BadgeCheck size={14} />
              Verified student
            </div>

            <h1>
              Welcome, <br />
              <span>{user.name}</span>
            </h1>

            <p>
              Your Humsafar profile is ready. Choose how you want to travel today.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="card dashboard-info-card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          <h3 className="form-card-title">Student Profile</h3>

          <div className="profile-info-row">
            <span>
              <UserRound size={15} />
              Full Name
            </span>
            <b>{user.name}</b>
          </div>

          <div className="profile-info-row">
            <span>
              <School size={15} />
              ERP
            </span>
            <b>{user.erp}</b>
          </div>

          <div className="profile-info-row">
            <span>
              <MapPin size={15} />
              Home
            </span>
            <b>{user.homeAddress}</b>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-action-grid"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          <button className="dashboard-action-card" onClick={() => navigate("/passenger")}>
            <div className="logo-mark">
              <MapPin size={22} />
            </div>
            <h3>Book a Ride</h3>
            <p>Find available student rides to or from campus.</p>
          </button>

          <button
            className="dashboard-action-card"
            onClick={() => {
              if (user.hasRiderProfile) {
                navigate("/rider");
              } else {
                navigate("/rider-profile-setup");
              }
            }}
          >
            <div
              className="logo-mark"
              style={{ background: "linear-gradient(135deg, #f59e0b, #fb7185)" }}
            >
              <Car size={22} />
            </div>
            <h3>{user.hasRiderProfile ? "Rider Dashboard" : "Add Rider Profile"}</h3>
            <p>
              {user.hasRiderProfile
                ? "Manage your active rides and passengers."
                : "Offer seats and become a Humsafar rider."}
            </p>
          </button>
        </motion.div>

        <div style={{ marginTop: "18px" }}>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
}

export default HomeDashboard;