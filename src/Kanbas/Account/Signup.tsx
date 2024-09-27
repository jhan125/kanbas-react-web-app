import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">

      <h1>Sign up</h1>
      <input
        placeholder="username"
        className="ud-username form-control mb-2" />
      <input
        placeholder="password"
        type="password"
        className="ud-username form-control mb-2" />
      <input
        placeholder="verify password"
        type="password"
        className="ud-username form-control mb-2" />

      <Link
        to="/Kanbas/Account/Profile"
        className="wd-signup-btn btn btn-primary w-100">
        Sign up
      </Link>
      <br />
      <Link
        to="/Kanbas/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}