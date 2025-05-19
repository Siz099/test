import { calculatePasswordStrength } from "../../utils/validation";
import "../../styles/PasswordStrengthMeter.css";

const PasswordStrengthMeter = ({ password }) => {
  const strength = calculatePasswordStrength(password);

  const getLabel = () => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const getColor = () => {
    switch (strength) {
      case 0:
        return "#ff4d4f";
      case 1:
        return "#ff7a45";
      case 2:
        return "#ffc53d";
      case 3:
        return "#73d13d";
      case 4:
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  return (
    <div className="password-strength-meter">
      <div className="strength-bars">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="strength-bar"
            style={{
              backgroundColor: index < strength ? getColor() : "#d9d9d9",
              opacity: index < strength ? 1 : 0.3,
            }}
          />
        ))}
      </div>
      {password && (
        <div className="strength-label" style={{ color: getColor() }}>
          {getLabel()}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
