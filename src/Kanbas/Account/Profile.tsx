import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">

      <h1>Profile</h1>
      
      {/* Updated with my own information */}
      <input
        id="wd-username"
        value="Jiali"
        placeholder="username"
        className="form-control mb-2" />
      <input
        id="wd-password"
        value="123"
        placeholder="password"
        type="password"
        className="form-control mb-2" />
      <input
        id="wd-firstname"
        value="Jiali"
        placeholder="First Name"
        className="form-control mb-2" />
      <input
        id="wd-lastname"
        value="Han"
        placeholder="Last Name"
        className="form-control mb-2" />
      <input
        id="wd-dob"
        value="2000-01-01"
        type="date"
        className="form-control mb-2" />
      <input
        id="wd-email"
        value="han.jial@northeastern.edu"
        type="email"
        className="form-control mb-2" />
        
      <select
        id="wd-role"
        className="form-control mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link to="/Kanbas/Account/Signin"
        className="btn btn-danger w-100 mt-2" >
        Sign out
      </Link>

    </div>
  );
}