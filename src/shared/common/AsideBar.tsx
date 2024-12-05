/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { MenuConstant } from "./Constant";

const { SubMenu } = Menu;

const AsideBar: React.FC = () => {
  return (
    <Menu mode="inline">
      {MenuConstant.map((item: any) =>
        item.childs.length > 0 ? (
          <SubMenu key={item.key} icon={item.icon} title={item.parent}>
            {item.childs.map((res: any) => (
              <Menu.Item key={res.link}>
                <Link to={res.link}>{res.label}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key}>
            {item.icon} <Link to={item.link} className="ms-2">{item.parent}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default AsideBar;
