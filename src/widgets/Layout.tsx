import React, { useState, ReactNode } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme, Avatar } from "antd";
import AsideBar from "@/shared/common/AsideBar";
import { logo } from "@/shared/MediaPath";
import { useAuth } from "./Authcontext";
import { Link, useNavigate } from "react-router-dom";
interface MyComponentProps {
  children: ReactNode;
}

const { Header, Sider, Content } = Layout;

const GlobalLayout: React.FC<MyComponentProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Layout>
      <Sider
        style={{ background: colorBgContainer }}
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Link to="/front" className="text-center text-[24px] px-2 py-5">
          <img src={logo} alt="logo" className="w-full max-w-full h-auto" />
        </Link>
        <AsideBar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center gap-2 pe-9 cursor-pointer" onClick={handleLogout}>
            <Avatar icon={<UserOutlined />} />
            Deconnexion
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "80vh",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default GlobalLayout;
