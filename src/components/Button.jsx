import { Loader2 } from "lucide-react";

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  loading = false,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variant === "secondary" ? "secondary-btn" : "primary-btn"} ${
        disabled || loading ? "btn-disabled" : ""
      }`}
    >
      {loading && <Loader2 size={17} className="spin-icon" />}
      {children}
    </button>
  );
}

export default Button;