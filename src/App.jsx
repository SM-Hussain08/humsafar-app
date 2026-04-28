import { BrowserRouter, Routes, Route } from "react-router-dom";

import Opening from "./pages/Opening";
import Login from "./pages/Login";
import VerifyCode from "./pages/VerifyCode";
import RoleSelect from "./pages/RoleSelect";
import ProfileSetup from "./pages/ProfileSetup";
import PassengerDashboard from "./pages/PassengerDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import RideDetails from "./pages/RideDetails";
import Payment from "./pages/Payment";
import Rating from "./pages/Rating";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Opening />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/rider" element={<RiderDashboard />} />
        <Route path="/ride/:id" element={<RideDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;