import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, UserRound, UsersRound } from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";

function RoleSelect() {
  const navigate = useNavigate();

  const chooseRole = (role) => {
    localStorage.setItem("humsafarRole", role);
    navigate("/profile");
  };

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
          <div className="logo-mark">
            <Car size={25} />
          </div>

          <span className="chip">Choose your role</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ marginTop: "45px" }}
        >
          <h1 style={{ fontSize: "38px", lineHeight: "1.1", marginBottom: "12px" }}>
            How do you want to travel today?
          </h1>

          <p className="muted-text">
            Choose whether you want to book a ride or offer seats on your route.
          </p>
        </motion.div>

        <div style={{ display: "grid", gap: "18px", marginTop: "34px" }}>
          <motion.button
            className="card"
            onClick={() => chooseRole("passenger")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              textAlign: "left",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div className="logo-mark" style={{ marginBottom: "16px" }}>
              <UserRound size={24} />
            </div>

            <h2 style={{ margin: "0 0 8px" }}>Passenger</h2>

            <p className="muted-text" style={{ margin: 0 }}>
              Find a verified student ride to City Campus, Main Campus, or back
              home from campus.
            </p>
          </motion.button>

          <motion.button
            className="card"
            onClick={() => chooseRole("rider")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              textAlign: "left",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              className="logo-mark"
              style={{
                marginBottom: "16px",
                background: "linear-gradient(135deg, #f59e0b, #fb7185)",
              }}
            >
              <UsersRound size={24} />
            </div>

            <h2 style={{ margin: "0 0 8px" }}>Rider</h2>

            <p className="muted-text" style={{ margin: 0 }}>
              Offer available seats, set your fare, and match with students on
              your campus route.
            </p>
          </motion.button>
        </div>
      </div>
    </ScreenWrapper>
  );
}

export default RoleSelect;