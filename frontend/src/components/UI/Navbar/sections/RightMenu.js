/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";

const RightMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">SIGNIN</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">SIGNUP</a>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(RightMenu);
