import { motion } from "framer-motion";
import { Car } from "lucide-react";

function ScreenWrapper({ children, showBrand = true }) {
  return (
    <div className="app-shell">
      {showBrand && (
        <motion.div
          className="brand-panel"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="brand-badge">
            <Car size={18} />
            Verified campus rides
          </div>

          <h1 className="brand-title">
            Hum<span>safar</span>
          </h1>

          <p className="brand-subtitle">
            Har safar mei humsafar tou zaroori hai. A clean and safe
            university ride-sharing experience for City and Main Campus.
          </p>
        </motion.div>
      )}

      <motion.div
        className="phone-frame"
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ScreenWrapper;