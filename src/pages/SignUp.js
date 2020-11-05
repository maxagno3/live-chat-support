import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGitHub, signInWithGoogle, signUp } from "../helpers/auth";
import {ReactComponent as Google} from '../media/logo-google.svg'

const SignUp = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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
    <div className='login-register '>
      <form onSubmit={handleSubmit} className='shadow-sm p-3 mb-5 bg-white rounded form-box'>
        <h1 className='login-heading'>
          <span> Sign Up to</span>
          <span><Link to="/">Live Chat Support</Link></span>
        </h1>
        <p className='mt-3 ftz-14'>Fill in the form below to create an account.</p>
        <div>
          <input className='form-control mt-3'
            placeholder="Email"
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div>
          <input className='form-control mt-3'
            placeholder="Password"
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button className='form-control mt-3 btn login-btn' type="submit">Sign up</button>
          <h3 className='mt-2'>Or</h3>
          <button className='form-control mt-2 btn login-btn-google' onClick={googleSignIn} type="button">
            <span>Sign up with</span> <Google />
          </button>
          <button className='form-control mt-3 btn login-btn-github' type="button" onClick={githubSignIn}>
            <span>Sign up with </span> <Github />
          </button>
        </div>

        <p className='mt-3'>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};


function Github() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
}

export default SignUp;
