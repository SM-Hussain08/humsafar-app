function Button({ children, variant = "primary", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={variant === "secondary" ? "secondary-btn" : "primary-btn"}
    >
      {children}
    </button>
  );
}

export default Button;