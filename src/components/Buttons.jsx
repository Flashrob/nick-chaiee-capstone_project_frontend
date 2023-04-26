import React from "react";
import "./buttons.css";
import { Link } from "react-router-dom";
import { SettingBtn } from "./PNG";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOutBtn } from "./PNG";

export function Button(props) {
  return (
    <button className="button-wrapper" {...props} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function AdvancementButton(props) {
  return (
    <button
      className="advancement-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function QuestionButton(props) {
  return (
    <button
      className="question-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function TranslationButton(props) {
  return (
    <button
      className="translation-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function TranslationAnswerButton(props) {
  return (
    <button
      className="translation-answer-button-wrapper"
      {...props}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export function SettingsButton() {
  return (
    <div>
      <Link to="/profile/edit" className="settings-btn">
        <SettingBtn />
      </Link>
    </div>
  );
}

export function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="log-button"
    >
      <LogOutBtn />
    </button>
  );
}

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
}
