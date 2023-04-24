import React, { useEffect, useState } from "react";
import "./profile.css";
import { useOutletContext } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { SettingsButton, LogoutButton } from "../components/Buttons";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";

export default function ProfileComponent() {
  const { isAuthenticated } = useAuth0();
  const [userData] = useOutletContext();
  const [voicevoxImage, setVoicevoxImage] = useState("");

  useEffect(() => {
    axios
      .get(`${Backend_URL}/voicevoxes/speaker/${userData?.voicevox_id}`)
      .then((response) => {
        setVoicevoxImage(response.data.face_image_url);
      });
  }, [userData?.voicevox_id]);

  if (!userData?.email_address) return null;

  return (
    <div className="profile-container">
      <div className="profile-image-wrapper">
        <h1 className="profile-title">Profile</h1>
        {isAuthenticated ? (
          <img
            src={userData.profile_pic_url}
            alt={userData.profile_pic_url}
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
      <div className="profile-info-container">
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Name:</h1>
          <p className="profile-input-box">
            {isAuthenticated
              ? `${userData.first_name} ${userData.last_name}`
              : ""}
          </p>
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Username:</h1>
          <p className="profile-input-box">{userData.username}</p>
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Email Address:</h1>
          <p className="profile-input-box">
            {isAuthenticated ? userData.email_address : ""}
          </p>
        </div>
        <div className="profile-info-wrapper">
          <h1 className="profile-info">Waifu voice:</h1>
          <img
            src={voicevoxImage}
            alt={voicevoxImage}
            className="profile-waifu-voice"
          />
        </div>
      </div>
      <div className="profile-settings-wrapper">
        <SettingsButton />
        <LogoutButton />
      </div>
    </div>
  );
}
