import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../helpers/auth";

function Login() {
  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setLoginDetails({ [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signIn(loginDetails.email, loginDetails.password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Login to
          <Link to="/">Live Chat Support</Link>
        </h1>
        <p>Fill in the form below to login into your account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={loginDetails.email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={loginDetails.password}
            type="password"
          ></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Login</button>
        </div>
        <hr></hr>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
