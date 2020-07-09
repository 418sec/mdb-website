import React from "react";
import { Menu } from "antd";

import './Navbar.css';


const LeftMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
      <a href="/favorite">FAVOURITE</a>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
