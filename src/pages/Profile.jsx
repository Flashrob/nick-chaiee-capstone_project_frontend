import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth0();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const retrieveUserInfo = async () => {
      await axios
        .get(`${Backend_URL}/users/${user.email}`)
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((err) => {
          console.log("2nd error", err);
        });
    };
    retrieveUserInfo();
  }, [user?.email]);

  const LogoutButton = () => {
    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
    );
  };
  if (!currentUser.email_address) return null;

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-image-wrapper">
          {isAuthenticated ? (
            <img
              src={currentUser.profile_pic_url}
              alt={currentUser.profile_pic_url}
              className="profile-image"
            />
          ) : (
            <img
              src={require("../assets/profile.png")}
              className="profile-image"
              alt="profile-pic"
            />
          )}
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Name:</h1>
          <input
            className="profile-input-box"
            value={
              isAuthenticated
                ? currentUser.first_name + currentUser.last_name
                : ""
            }
            readOnly
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Username:</h1>
          <input
            className="profile-input-box"
            value={isAuthenticated ? currentUser.username : ""}
            readOnly
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Email Address:</h1>
          <input
            className="profile-input-box"
            value={isAuthenticated ? currentUser.email_address : ""}
            readOnly
          />
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Country:</h1>
          <input
            className="profile-input-box"
            value={isAuthenticated ? currentUser.country : ""}
            readOnly
          />
        </div>
        <button>
          <Link to="/edit-profile" className="edit-profile-btn">
            Edit Profile
          </Link>
        </button>
        {LogoutButton()}
      </div>
    </div>
  );
}
