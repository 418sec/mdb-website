/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../../../../actions/userActions";

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    const token = localStorage.getItem("token");
    dispatch(signOut(token));
  };
  let rm = null;
  if (user.userData) {
    rm = (
      <Menu mode={props.mode}>
        <Menu.Item key="favourite">
          <Link to="/favourite">FAVOURITE</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    rm = (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">SIGNIN</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">SIGNUP</Link>
        </Menu.Item>
      </Menu>
    );
  }
  return <React.Fragment>{rm}</React.Fragment>;
};

export default withRouter(RightMenu);
