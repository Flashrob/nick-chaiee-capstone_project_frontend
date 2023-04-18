import React, { useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { NavLogo, LessonPNG, CharacterPNG, ProfilePNG, AboutPNG } from "./PNG";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL.js";

export default function Navbar(userData) {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const userInfo = {
        username: user?.nickname,
        first_name: user?.given_name || user?.name,
        last_name: user?.family_name || "",
        email_address: user?.email,
        profile_pic_url: user?.picture,
        voicevox_id: 1,
      };
      axios.post(`${Backend_URL}/users/newUser`, userInfo).catch((err) => {
        console.log(userInfo);
        console.log("Axios post to BE error", err);
      });
    }
  }, [isAuthenticated]);

  return (
    <div className="navbar">
      <Link to="/">
        <NavLogo />
      </Link>
      {isAuthenticated ? (
        <ul className="nav-link-container">
          <li className="nav-link-wrapper">
            <Link
              to="/lesson"
              className="nav-link-text-wrapper"
              state={{ type: `vocabs` }}
            >
              <LessonPNG />
              <span className="nav-link-text">LESSON</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/characters/display" className="nav-link-text-wrapper">
              <CharacterPNG />
              <span className="nav-link-text">CHARACTERS</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/profile/user" className="nav-link-text-wrapper">
              {isAuthenticated ? (
                <img
                  src={userData?.userData?.profile_pic_url}
                  alt={userData?.userData?.profile_pic_url}
                  className="nav-link-profile-image"
                />
              ) : (
                <ProfilePNG />
              )}

              <span className="nav-link-text">PROFILE</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/about/about" className="nav-link-text-wrapper">
              <AboutPNG />
              <span className="nav-link-text">ABOUT</span>
            </Link>
          </li>
          <li className="nav-link-wrapper">
            <Link to="/about/landing" className="nav-link-text-wrapper">
              <AboutPNG />
              <span className="nav-link-text">LANDING</span>
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

//<<<<<<<<<<<<<<SETTLE NEXT TIME(METADATA)>>>>>>>>>>>>>>>>>>>
// const [userMetadata, setUserMetadata] = useState({});
// const getUserMetaData = async () => {
//   const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//   // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
//   try {
//     const accessToken = await getAccessTokenSilently({
//       // authorizationParams: {
//       audience: `https://${domain}/api/v2/`,
//       scope: "read:users",
//       // },
//     });
//     const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
//     const metadataResponse = await fetch(userDetailsByIdUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     console.log("metadata response", metadataResponse);
//     const { user_metadata } = await metadataResponse.json();
//     console.log("user_metadata", user_metadata);
//     setUserMetadata(user_metadata);
//     console.log(
//       "authenticated",
//       isAuthenticated,
//       "user",
//       user,
//       "metadata",
//       userMetadata,
//       "user.sub",
//       user.sub
//     );
//   } catch (err) {
//     console.log("error", err.message);
//   }
// };
