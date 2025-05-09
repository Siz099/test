import RegisterForm from "../components/auth/RegisterForm"
import "../styles/Register.css"

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <div className="register-illustration">
            {/* Similar illustration as login page but with slight variations */}
            <div className="register-graphic"></div>
          </div>
        </div>
        <div className="register-right">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register;
