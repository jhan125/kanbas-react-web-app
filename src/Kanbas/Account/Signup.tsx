import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({ role: "STUDENT" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="wd-username form-control mb-2"
      />

      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
        className="wd-username form-control mb-2"
      />

      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="verify password"
        type="password"
        className="wd-username form-control mb-2"
      />

      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="wd-role form-control mb-2"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Admin</option>
        <option value="TA">Teaching Assistant</option>
      </select>

      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </button>
      <br />

      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
