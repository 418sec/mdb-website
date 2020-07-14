import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button } from "antd";

import { signOut } from "../../actions/userActions";
import classes from "./ProfilePage.module.css";

const ProfilePage = (props) => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    dispatch(signOut(token));
  };

  useEffect(() => {
    if (user.userData) {
      setUsername(user.userData.username);
      setProfilePic(user.userData.profilePic);
    }

    return () => {};
  }, [user.userData, dispatch]);

  return (
    <div className={classes.Profile}>
      <div className={classes.ProfileOrders}>
        <ul className={classes.FormContainer} >
         
          <Avatar style={{ height: '140px', width: '140px', marginLeft: '15px'}} src={profilePic} alt="image" />

          <h3 style={{marginTop: '20px'}}>{username}</h3>
          <li style={{marginTop: '20px', marginLeft: '9px'}}>
            <Link to="/user/update/">Update Profile</Link>
          </li>
          <li>
            <Button
              type="button"
              onClick={handleLogout}
              style={{marginTop: '20px', marginLeft: '9px'}}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
