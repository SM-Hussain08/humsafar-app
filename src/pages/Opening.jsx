import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, ShieldCheck, MapPin } from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function Opening() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <div className="screen">
        <div className="screen-header">
          <div className="logo-mark">
            <Car size={26} />
          </div>
          <span className="chip">
            <ShieldCheck size={14} />
            Student verified
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginTop: "70px" }}
        >
          <div className="chip">
            <MapPin size={14} />
            City Campus & Main Campus
          </div>

          <h1 style={{ fontSize: "48px", lineHeight: "1", margin: "22px 0 12px" }}>
            Har safar mei <br />
            <span style={{ color: "var(--primary)" }}>Humsafar</span>
          </h1>

          <p className="muted-text" style={{ fontSize: "16px" }}>
            Find safe student rides to campus or from campus with verified
            riders, clear fares, and simple payment options.
          </p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ marginTop: "42px" }}
        >
          <h3 style={{ marginTop: 0 }}>Your campus ride companion</h3>

          <p className="muted-text">
            Book rides between your location and City or Main Campus in a few
            simple steps.
          </p>

          <Button onClick={() => navigate("/login")}>Start your safar</Button>
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

export default Opening;