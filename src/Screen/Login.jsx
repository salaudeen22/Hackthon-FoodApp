import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authtoken", json.authtoken);
      console.log(localStorage.getItem("authtoken"));
      if (json.role === "customer") {
        navigate("/");
      } else if (json.role === "admin") {
        navigate("/admin");
      } else if (json.role === "vendor") {
        localStorage.setItem("name", json.name);
        navigate("/Vendor");
      }
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="loginBody">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <Link to="/createuser" className="m-3 btn btn-danger">
                I am a new user
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
