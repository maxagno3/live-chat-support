import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGitHub, signInWithGoogle, signUp } from "../helpers/auth";

const SignUp = () => {
  const [error, setError] = useState("");
  //   const [signUpDetails, setSignUpDetails] = useState({
  //     email: "",
  //     password: "",
  //   });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const handleChange = ({ target: { name, value } }) => {
//     console.log({ [name]: value });
//     setSignUpDetails({ [name]: value });
//   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signUp(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  const githubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link to="/">Live Chat Support</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
          <p>Or</p>
          <button onClick={googleSignIn} type="button">
            Sign up with Google
          </button>
          <button type="button" onClick={githubSignIn}>
            Sign up with GitHub
          </button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
