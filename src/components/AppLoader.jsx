import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Splash from "../pages/Splash";

export default function AppLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show splash on every refresh
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [location.key]); // triggers on refresh

  if (loading) {
    return <Splash />;
  }

  return children;
}