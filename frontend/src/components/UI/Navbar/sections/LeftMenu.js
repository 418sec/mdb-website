import React from "react";
import { Menu } from "antd";

import './Navbar.css';
import { Link } from "react-router-dom";

const LeftMenu = (props) => {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="search">
     
    </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
