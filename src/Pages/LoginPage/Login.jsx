import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../LoginPage/Login.css";
const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginBox, setLoginBox] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (gmail && password) {
      setIsLoggedIn(true);
      localStorage.setItem("mapLoggedIn", true);
      dispatch({ type: "EMAIL", payload: gmail });
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("mapLoggedIn");
    if (!loggedIn) setIsLoggedIn(true);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div
        onClick={() => {
          setLoginBox(!loginBox);
        }}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          display: isLoggedIn ? "none" : "block",
          margin: "10px",
          marginLeft: "70%",
          padding: "10px 0",
          width: "250px"
        }}
      >
        Login
      </div>
      {!isLoggedIn ? (
        <div
          style={{
            display: loginBox ? "block" : "none",
            zIndex: 11,
            position: "absolute",
            left: "70%",
            width: "250px",
            borderRadius: "10px",
            backgroundColor: "white"
          }}
        >
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin} className="form">
            <div className="form-field">
              <label htmlFor="gmail">Gmail</label>
              <input
                type="email"
                id="gmail"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                className="input"
                placeholder="Enter your Gmail"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
              className="login-button"
            >
              Log In
            </button>
          </form>
        </div>
      ) : (
        <div className="dropdown-container">
          <button
            onClick={handleDropdownToggle}
            style={{
              display: isLoggedIn ? "block" : "none",
              padding: "10px 0",
              width: "250px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              margin: "10px",
              marginLeft: "70%",
              cursor: "pointer"
            }}
          >
            Account
          </button>

          {showDropdown && (
            <div
              style={{
                borderRadius: "10px",
                display: !isLoggedIn ? "none" : "block",
                position: "absolute",
                zIndex: 11,
                color: "white",
                backgroundColor: "white",
                margin: "10px 0",
                marginLeft: "70%",
                width: "250px",
                background: "rgb(0, 123, 255)"
              }}
            >
              <div
                onClick={() => {
                  localStorage.setItem("mapLoggedIn", false);
                  setIsLoggedIn(false);
                  setLoginBox(false);
                  setShowDropdown(false);
                  dispatch({ type: "EMAIL", payload: "" });
                }}
                style={{
                  display: isLoggedIn ? "block" : "none",
                  borderRadius: "10px",
                  margin: "10px",
                  backgroundColor: "#FF0000",
                  color: "white",
                  border: "none",
                  cursor: "pointer"
                }}
                className="dropdown-item"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <div className="login-container">
      <div className="login-form">
        {!isLoggedIn ? (
          <div>
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin} className="form">
              <div className="form-field">
                <label htmlFor="gmail">Gmail</label>
                <input
                  type="email"
                  id="gmail"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  className="input"
                  placeholder="Enter your Gmail"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Log In
              </button>
            </form>
          </div>
        ) : (
          <div className="dropdown-container">
            <button onClick={handleDropdownToggle} className="dropdown-button">
              Account
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li className="dropdown-item">Profile</li>
                  <li className="dropdown-item">Settings</li>
                  <li className="dropdown-item">Logout</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
