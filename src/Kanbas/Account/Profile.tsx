import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">

      <h3>Profile</h3>
      {/* Updated with my own information */}
      <input id="wd-username" value="Jiali" placeholder="username" /><br />
      <input id="wd-password" value="123" placeholder="password" type="password" /><br />
      <input id="wd-firstname" value="Jiali" placeholder="First Name" /><br />
      <input id="wd-lastname" value="Han" placeholder="Last Name" /><br />
      <input id="wd-dob" value="2000-01-01" type="date" /><br />
      <input id="wd-email" value="han.jial@northeastern.edu" type="email" /><br />
      <select id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br />

      <Link to="/Kanbas/Account/Signin" >Sign out</Link>
    </div>
  );
}