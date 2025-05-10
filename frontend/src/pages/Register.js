import RegisterForm from "../components/auth/RegisterForm"
import "../styles/Register.css"

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <RegisterForm />
        </div>
        <div className="register-right">
          <div className="register-illustration">
            {/* Using a placeholder image since the original URL might not be accessible */}
            <img
              src="../imgaes/signup-illustration.png"
              alt="Sign up illustration"
              className="signup-illustration-image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
