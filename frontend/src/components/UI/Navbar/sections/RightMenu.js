/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../../../../actions/userActions";

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(signOut());
    window.location.reload();
  };

  let rm;
  if (user.userData) {
    rm = (
      <Menu mode={props.mode}>
        <Menu.Item key="/favorite" style={{ borderBottom: "none" }}>
          <Link to="/favorite">FAVORITE</Link>
        </Menu.Item>
        <Menu.Item key="/logout" style={{ borderBottom: "none" }}>
          <Button
            type="primary"
            onClick={logoutHandler}
            style={{ fontWeight: "bold", borderBottom: "none" }}
          >
            LOGOUT
          </Button>
        </Menu.Item>
      </Menu>
    );
  } else {
    rm = (
      <Menu mode={props.mode}>
        <Menu.Item key="mail" style={{ borderBottom: "none" }}>
          <Link to="/login">SIGN IN</Link>
        </Menu.Item>
        <Menu.Item key="app" style={{ borderBottom: "none" }}>
          <Link to="/register">SIGN UP</Link>
        </Menu.Item>
      </Menu>
    );
  }
  return <React.Fragment>{rm}</React.Fragment>;
};

export default withRouter(RightMenu);
