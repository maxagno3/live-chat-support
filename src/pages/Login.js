import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../helpers/auth";

function Login() {
  const [error, setError] = useState("");
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

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
    <div className='login-register '>
      <form onSubmit={handleSubmit} className='shadow-sm p-3 mb-5 bg-white rounded form-box'>
        <h1 className='login-heading'>
          <span> Login to</span>
          <span><Link to="/"> Live Chat Support</Link></span>
        </h1>
        <p className='mt-3 ftz-14'>Fill in the form below to login into your account.</p>
        <div>
          <input className='form-control mt-3'
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={loginDetails.email}
          ></input>
        </div>
        <div>
          <input
            className='form-control mt-3'
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={loginDetails.password}
            type="password"
          ></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button className='form-control mt-3 btn login-btn' type="submit">Login</button>
        </div>
        <p className='mt-3'>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
