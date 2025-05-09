import LoginForm from "../components/auth/loginForm"
import "../styles/Login.css"

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-illustration">
            {/* Phone */}
            <div className="phone">
              <div className="phone-notch">
                <div className="phone-notch-dot"></div>
                <div className="phone-notch-dot"></div>
                <div className="phone-notch-dot"></div>
              </div>
            </div>

            {/* Red bar */}
            <div className="red-bar">
              <div className="red-bar-dots">
                <div className="red-bar-dot"></div>
                <div className="red-bar-dot"></div>
                <div className="red-bar-dot"></div>
              </div>
            </div>

            {/* Lock */}
            <div className="lock">
              <div className="lock-body">
                <div className="lock-keyhole"></div>
              </div>
              <div className="lock-shackle"></div>
            </div>

            {/* People */}
            <div className="people">
              <img src="https://via.placeholder.com/120" alt="People looking at phone" />
            </div>
          </div>
        </div>
        <div className="login-right">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login;
