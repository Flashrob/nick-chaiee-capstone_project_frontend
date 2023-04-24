import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Backend_URL } from "../BACKEND_URL.js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [allUserData, setAllUserData] = useState([]);
  const [isUserDataUpdated, setIsUserDataUpdated] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const { email } = user;
      setUserEmail(email);
    }
  }, [user, isAuthenticated, isLoading]);

  useEffect(() => {
    if (userEmail) {
      axios.get(`${Backend_URL}/users/${userEmail}`).then((response) => {
        setUserData(response.data);
      });
    }
    if (isUserDataUpdated === true) {
      axios.get(`${Backend_URL}/users/${userEmail}`).then((response) => {
        setUserData(response.data);
      });
    } else {
      setIsUserDataUpdated(false);
    }
  }, [userEmail, isUserDataUpdated]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      try {
        axios.get(`${Backend_URL}/users`).then((response) => {
          setAllUserData(response.data);
        });
      } catch (error) {
        console.log("Axios get all users error", error);
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <UserContext.Provider
      value={{
        userData,
        allUserData,
        setUserData,
        setIsUserDataUpdated,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
