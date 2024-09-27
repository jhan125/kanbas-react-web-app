import { useState } from "react";

export default function AccountNavigation() {
  const [activeLink, setActiveLink] = useState('');

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

      <a id="wd-account-signin-link"
        href="#/Kanbas/Account/Signin"
         className={`list-group-item text-center border-0 
          ${activeLink === 'signin' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('signin')}>
        Signin
      </a>

      <a id="wd-account-signup-link"
        href="#/Kanbas/Account/Signup"
        className={`list-group-item text-center border-0 
          ${activeLink === 'signup' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('signup')}>
        Signup
      </a>

      <a id="wd-account-profile-link"
        href="#/Kanbas/Account/Profile"
        className={`list-group-item text-center border-0 
          ${activeLink === 'profile' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('profile')}>
        Profile
      </a>

    </div>
  );
}