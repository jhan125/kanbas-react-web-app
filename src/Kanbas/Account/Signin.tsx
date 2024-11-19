import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const user =  await client.signin(credentials);
      if (!user) return;

      dispatch(setCurrentUser(user));
  
      navigate("/Kanbas/Dashboard");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div id="wd-signin-screen">

      <h1>Sign in</h1>

      {errorMessage &&
        (<div id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>)
      }

      <input
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        id="wd-username"
        placeholder="username"
        className="form-control mb-2" />

      <input
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2" />

      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2" >
        Sign in
      </button>
      <br />

      <Link
        id="wd-signup-link"
        to="/Kanbas/Account/Signup">
        Sign up
      </Link>

    </div>
  );
}