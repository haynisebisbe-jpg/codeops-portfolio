import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleLogin() {
    signIn();
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h2>Sign In</h2>
      <p>You need to sign in before checking out.</p>

      <button onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
}

export default Login;