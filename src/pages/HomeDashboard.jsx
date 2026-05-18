import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  Car,
  ChevronDown,
  Clock,
  Coins,
  Leaf,
  LogOut,
  MapPin,
  Plus,
  School,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";

import ScreenWrapper from "../components/ScreenWrapper";
import Button from "../components/Button";
import { dummySchedule } from "../data/dummySchedule";
import { dummyLiveRiders } from "../data/dummyLiveRiders";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const quickAreas = [
  "Gulshan-e-Iqbal, Karachi",
  "DHA Phase 6, Karachi",
  "Clifton, Karachi",
  "North Nazimabad, Karachi",
  "PECHS, Karachi",
];

function HomeDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [liveTick, setLiveTick] = useState(0);
  const [toast, setToast] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const [openSections, setOpenSections] = useState({
    schedule: true,
    going: true,
    coming: false,
    custom: true,
  });

  const [customRequests, setCustomRequests] = useState(
    JSON.parse(localStorage.getItem("humsafarCustomRequests")) || []
  );

  const [customForm, setCustomForm] = useState({
    day: "Monday",
    time: "15:45",
    pickup: "Home",
    destination: "Main Campus",
    customPickup: "",
    customDestination: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("humsafarCurrentUser"));

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(savedUser);
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTick((prev) => prev + 1);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("humsafarCustomRequests", JSON.stringify(customRequests));
  }, [customRequests]);

  const schedule = dummySchedule[selectedDay];
  const firstClass = schedule?.classes?.[0];
  const lastClass = schedule?.classes?.[schedule.classes.length - 1];

  const liveRiders = useMemo(() => {
    const riders = [...dummyLiveRiders];
    const shift = liveTick % riders.length;
    return [...riders.slice(shift), ...riders.slice(0, shift)];
  }, [liveTick]);

  const todayCustomRequests = customRequests.filter((req) => req.day === selectedDay);

  const toggleSection = (key) => {
    setOpenSections({ ...openSections, [key]: !openSections[key] });
  };

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

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(""), 2200);
  };

  const requestCarpool = (type, rider) => {
    showToast(`Request sent to ${rider.name} for ${type}.`);
  };

  const updateCustomForm = (field, value) => {
    setCustomForm({ ...customForm, [field]: value });
  };

  const addCustomRequest = () => {
    const request = {
      id: Date.now(),
      ...customForm,
    };

    setCustomRequests([request, ...customRequests]);
    setShowCustomForm(false);
    showToast("Custom ride request added.");
  };

  const deleteCustomRequest = (id) => {
    setCustomRequests(customRequests.filter((req) => req.id !== id));
    showToast("Custom request deleted.");
  };

  const resolveLocation = (type, custom) => {
    if (type === "Home") return user?.homeAddress || "Home";
    if (type === "Custom Location") return custom || "Custom location";
    return type;
  };

  if (!user) return null;

  return (
    <ScreenWrapper showBrand={false}>
      <div className="screen mobile-home-screen">
        <AnimatePresence>
          {toast && (
            <motion.div
              className="premium-toast"
              initial={{ opacity: 0, y: -14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
            >
              <BadgeCheck size={17} />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mobile-topbar">
          <div>
            <p>Humsafar</p>
            <h3>Campus commute</h3>
          </div>

          <button onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </div>

        <motion.div
          className="mobile-profile-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="dashboard-avatar compact">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.name} />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>

          <div className="mobile-profile-copy">
            <span className="live-chip">
              <span></span>
              Verified student
            </span>
            <h1>{user.name}</h1>
            <p>ERP {user.erp}</p>
          </div>
        </motion.div>

        <div className="mobile-stats-grid">
          <MiniStat icon={<Coins size={16} />} value="250" label="Credits" />
          <MiniStat icon={<ShieldCheck size={16} />} value="96%" label="Trust" />
          <MiniStat icon={<Leaf size={16} />} value="4.2kg" label="CO₂ saved" />
        </div>

        <div className="day-selector mobile-days">
          {days.map((day) => (
            <button
              key={day}
              className={selectedDay === day ? "day-pill active" : "day-pill"}
              onClick={() => {
                setSelectedDay(day);
                setCustomForm({ ...customForm, day });
              }}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        <AccordionCard
          title="Today’s Classes"
          subtitle={`${selectedDay} · ${schedule?.campus || "No campus"}`}
          icon={<School size={20} />}
          isOpen={openSections.schedule}
          onToggle={() => toggleSection("schedule")}
        >
          {schedule?.classes?.length ? (
            <div className="class-list">
              {schedule.classes.map((item) => (
                <div className="class-item" key={`${item.course}-${item.start}`}>
                  <span>{item.start}–{item.end}</span>
                  <b>{item.course}</b>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted-text">No classes scheduled. Add a custom request.</p>
          )}
        </AccordionCard>

        <AccordionCard
          title="Going to Uni"
          subtitle={`Home → ${schedule.campus}`}
          icon={<School size={20} />}
          isOpen={openSections.going}
          onToggle={() => toggleSection("going")}
        >
          <SuggestionMeta
            time={firstClass ? `Arrive before ${firstClass.start}` : "No class today"}
            note={
              firstClass
                ? `Based on your first class: ${firstClass.course}`
                : "Try custom request"
            }
          />

          <LiveRiderList
            riders={liveRiders.slice(0, 3)}
            type="Going to Uni"
            onRequest={requestCarpool}
          />
        </AccordionCard>

        <AccordionCard
          title="Coming Back"
          subtitle={`${schedule.campus} → Home`}
          icon={<MapPin size={20} />}
          isOpen={openSections.coming}
          onToggle={() => toggleSection("coming")}
        >
          <SuggestionMeta
            time={lastClass ? `Leave after ${lastClass.end}` : "No class today"}
            note={
              lastClass
                ? `Based on your last class: ${lastClass.course}`
                : "Try custom request"
            }
          />

          <LiveRiderList
            riders={liveRiders.slice(1, 4)}
            type="Coming Back from Uni"
            onRequest={requestCarpool}
          />
        </AccordionCard>

        <AccordionCard
          title="Custom Requests"
          subtitle={`${todayCustomRequests.length} active for ${selectedDay}`}
          icon={<Sparkles size={20} />}
          isOpen={openSections.custom}
          onToggle={() => toggleSection("custom")}
          action={
            <button
              className="round-icon-btn small"
              onClick={(e) => {
                e.stopPropagation();
                setShowCustomForm(!showCustomForm);
              }}
            >
              <Plus size={17} />
            </button>
          }
        >
          {showCustomForm && (
            <motion.div
              className="custom-form premium-custom-form"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="input-row">
                <div className="input-group">
                  <label>Day</label>
                  <select
                    value={customForm.day}
                    onChange={(e) => updateCustomForm("day", e.target.value)}
                  >
                    {days.map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={customForm.time}
                    onChange={(e) => updateCustomForm("time", e.target.value)}
                  />
                </div>
              </div>

              <LocationSelect
                title="Pickup"
                value={customForm.pickup}
                customValue={customForm.customPickup}
                onTypeChange={(value) => updateCustomForm("pickup", value)}
                onCustomChange={(value) => updateCustomForm("customPickup", value)}
              />

              <LocationSelect
                title="Destination"
                value={customForm.destination}
                customValue={customForm.customDestination}
                onTypeChange={(value) => updateCustomForm("destination", value)}
                onCustomChange={(value) => updateCustomForm("customDestination", value)}
              />

              <Button onClick={addCustomRequest}>Add Custom Request</Button>
            </motion.div>
          )}

          {todayCustomRequests.length === 0 ? (
            <div className="empty-custom">
              <Clock size={18} />
              No custom requests for this day yet.
            </div>
          ) : (
            todayCustomRequests.map((req) => (
              <div className="custom-request-card" key={req.id}>
                <div>
                  <b>{req.time}</b>
                  <p>
                    {resolveLocation(req.pickup, req.customPickup)} →{" "}
                    {resolveLocation(req.destination, req.customDestination)}
                  </p>
                </div>
                <button onClick={() => deleteCustomRequest(req.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}

          {todayCustomRequests.map((req) => (
            <div className="mini-live-panel" key={`live-${req.id}`}>
              <SuggestionMeta
                time={`Custom request · ${req.time}`}
                note={`${resolveLocation(req.pickup, req.customPickup)} → ${resolveLocation(
                  req.destination,
                  req.customDestination
                )}`}
              />
              <LiveRiderList
                riders={liveRiders.slice(0, 2)}
                type="Custom Request"
                onRequest={requestCarpool}
              />
            </div>
          ))}
        </AccordionCard>

        <div className="rider-profile-cta mobile-rider-cta">
          <div>
            <h3>{user.hasRiderProfile ? "Rider profile ready" : "Want to offer rides?"}</h3>
            <p>
              {user.hasRiderProfile
                ? "Manage your carpool offers."
                : "Set up rider profile later and start accepting students."}
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() =>
              user.hasRiderProfile ? navigate("/rider") : navigate("/rider-profile-setup")
            }
          >
            {user.hasRiderProfile ? "Go to Rider Profile" : "Set Rider Profile"}
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
}

function MiniStat({ icon, value, label }) {
  return (
    <div>
      {icon}
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

function AccordionCard({ title, subtitle, icon, isOpen, onToggle, children, action }) {
  return (
    <motion.div className="mobile-accordion-card" layout>
      <button className="accordion-head" onClick={onToggle}>
        <div className="accordion-title-icon">{icon}</div>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        <div className="accordion-actions">
          {action}
          <ChevronDown className={isOpen ? "chevron open" : "chevron"} size={19} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="accordion-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SuggestionMeta({ time, note }) {
  return (
    <div className="suggestion-meta compact-meta">
      <Clock size={15} />
      <b>{time}</b>
      <span>{note}</span>
    </div>
  );
}

function LiveRiderList({ riders, type, onRequest }) {
  return (
    <AnimatePresence mode="popLayout">
      {riders.map((rider) => (
        <motion.div
          key={`${type}-${rider.id}`}
          className="live-rider-card mobile-rider-card"
          layout
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.97 }}
        >
          <div className="rider-photo">
            <img
              src={rider.photo}
              alt={rider.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "grid";
              }}
            />
            <span>{rider.initials}</span>
          </div>

          <div className="rider-main">
            <div className="rider-name-row">
              <b>{rider.name}</b>
              <span>Rs {rider.price}</span>
            </div>

            <p>
              {rider.car} · {rider.plate} · {rider.seats} seats
            </p>

            <div className="rider-tags">
              {rider.routeTags.slice(0, 3).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <button className="hail-btn" onClick={() => onRequest(type, rider)}>
            Request
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

function LocationSelect({
  title,
  value,
  customValue,
  onTypeChange,
  onCustomChange,
}) {
  return (
    <div className="location-picker-block">
      <div className="input-group">
        <label>{title}</label>
        <select value={value} onChange={(e) => onTypeChange(e.target.value)}>
          <option>Home</option>
          <option>Main Campus</option>
          <option>City Campus</option>
          <option>Custom Location</option>
        </select>
      </div>

      {value === "Custom Location" && (
        <motion.div
          className="mini-map-picker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="input-group">
            <label>{title} Address</label>
            <input
              placeholder="Type or pin a demo location"
              value={customValue}
              onChange={(e) => onCustomChange(e.target.value)}
            />
          </div>

          <div className="quick-area-grid">
            {quickAreas.map((area) => (
              <button
                type="button"
                key={`${title}-${area}`}
                className={customValue === area ? "quick-area active" : "quick-area"}
                onClick={() => onCustomChange(area)}
              >
                {area.split(",")[0]}
              </button>
            ))}
          </div>

          <div className="fake-map small-map">
            <div className="map-line line-one"></div>
            <div className="map-line line-two"></div>
            <div className="map-line line-three"></div>
            <div className="map-pin">
              <MapPin size={22} />
            </div>
            <div className="map-location-label">
              {customValue || "Pin your custom location"}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default HomeDashboard;