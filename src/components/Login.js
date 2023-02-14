import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  // States to handle the form
  const [userList, setUserList] = useState(
    JSON.parse(localStorage.getItem("userList")) || []
  );
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const [showSignupSignup, setSignupSignup] = useState(false);
  const [error, setError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFailed, setShowAlertFailed] = useState(false);

  // Handle the display of the Sign up/Sign in
  const handleSigninSignup = () => {
    setSignupSignup(!showSignupSignup);
  };

  // Functions to handle the input changes and manage its state
  const handleChangeLogin = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  // Function to handle the form submission when user is registered
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || username.length === 0 || password.length === 0) {
      setError(true);
    } else {
      setUserList([...userList, { name, username, password }]);
      localStorage.setItem("userList", JSON.stringify(userList));
      setName("");
      setUsername("");
      setPassword("");
      setError(false);
      setShowAlert(true);
    }
  };

  // Function to handle the Login
  let isUserAuth;
  const handleLogin = (e) => {
    e.preventDefault();
    if (userLogin.username.length === 0 || userLogin.password.length === 0) {
      setError(true);
    }
    const storedUsers = JSON.parse(localStorage.getItem("userList"));
    isUserAuth = storedUsers.some(
      (user) =>
        user.username === userLogin.username &&
        user.password === userLogin.password
    );
    if (isUserAuth) {
      localStorage.setItem("isAuthenticated", "true");
      window.location.pathname = "/home";
    } else {
      setShowAlertFailed(true);
      setUserLogin({
        username: "",
        password: "",
      });
    }
    return isUserAuth;
  };
  isUserAuth = JSON.parse(localStorage.getItem("isAuthenticated"));

  // Handles the alert after the account has been created
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  // Handles the alert if login fails
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlertFailed(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlertFailed]);

  return (
    <>
      <div className="login--container">
        {showSignupSignup ? (
          <div className="login--modal">
            <h3>CREATE AN ACCOUNT</h3>
            <form onSubmit={handleSubmit}>
              <div className="login--input-space">
                <input
                  type="text"
                  value={name}
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                {error && name.length <= 0 ? (
                  <label>Name is required</label>
                ) : (
                  ""
                )}
              </div>
              <div className="login--input-space">
                <input
                  type="text"
                  value={username}
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {error && username.length <= 0 ? (
                  <label>Username is required</label>
                ) : (
                  ""
                )}
              </div>
              <div className="login--input-space">
                <input
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && password.length <= 0 ? (
                  <label>Password is required</label>
                ) : (
                  ""
                )}
              </div>
              <button className="cta-button">Sign up</button>
              <a
                href="#"
                onClick={handleSigninSignup}
                className="toggle-login-link"
              >
                I'm already a member
              </a>
              <Alert show={showAlert} variant="dark">
                Your account has been created
              </Alert>
            </form>
          </div>
        ) : (
          <div className="login--modal">
            <form onSubmit={handleLogin}>
              <div className="login--input-space">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userLogin.username}
                  onChange={handleChangeLogin}
                />
                {error && userLogin.username.length <= 0 ? (
                  <label>Username is required</label>
                ) : (
                  ""
                )}
              </div>
              <div className="login--input-space">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userLogin.password}
                  onChange={handleChangeLogin}
                />
                {error && userLogin.password.length <= 0 ? (
                  <label>Password is required</label>
                ) : (
                  ""
                )}
              </div>
              <button className="cta-button">Sign in</button>
              <a
                href="#"
                onClick={handleSigninSignup}
                className="toggle-login-link"
              >
                Create an account
              </a>
              <Alert show={showAlertFailed} variant="danger">
                Your Username and/or Password are incorrect
              </Alert>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
