import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };

  const signout = () => {
    // clear current user in Redux store
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  // helper function to format date to YYYY-MM-DD
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // React's useEffect hook lets you run side effects 
  //(like data fetching, subscriptions, or manually updating the DOM) in functional components.
  // this means fetchProfile function will be executed once, when the component is first rendered
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen">

      <h1>Profile</h1>

      {/*  if profile data exists -> Render profile form */}
      {profile && (
        <div>
          <input
            id="wd-username"
            value={profile.username}
            placeholder="username"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <input
            id="wd-password"
            value={profile.password}
            placeholder="password"
            type="password"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <input
            id="wd-firstname"
            value={profile.firstName}
            placeholder="first name"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <input
            id="wd-lastname"
            value={profile.lastName}
            placeholder="last name"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <input
            id="wd-dob"
            value={profile.dob ? formatDate(profile.dob) : ""}
            placeholder="date of birth"
            type="date"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
          <input
            id="wd-email"
            value={profile.email}
            type="email"
            placeholder="email"
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />

          <select
            id="wd-role"
            value={profile.role}
            className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <button
            onClick={signout}
            className="btn btn-danger w-100 mb-2"
            id="wd-signout-btn">
            Sign out
          </button>
        </div>
      )}


    </div>
  );
}