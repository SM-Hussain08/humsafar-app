import { useNavigate } from "react-router-dom";
import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";

function RiderProfileSetup() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper>
      <div className="screen">
        <h1>Rider Profile Setup</h1>
        <p className="muted-text">
          We will design this next. Your basic profile is saved temporarily until
          rider setup is completed.
        </p>

        <Button onClick={() => navigate("/profile")}>Back to Profile Setup</Button>
      </div>
    </ScreenWrapper>
  );
}

export default RiderProfileSetup;