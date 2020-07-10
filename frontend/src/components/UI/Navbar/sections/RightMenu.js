/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { withRouter, Link } from "react-router-dom";

const RightMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <Link to="/favourite">FAVOURITE</Link>
      </Menu.Item>
      <Menu.Item key="mail">
        <Link to="/login">SIGNIN</Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/register">SIGNUP</Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(RightMenu);
