import React, { useState, ReactNode } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import AsideBar from "@/shared/common/AsideBar";
import { logo } from "@/shared/MediaPath";
interface MyComponentProps {
  children: ReactNode;
}

const { Header, Sider, Content } = Layout;

const GlobalLayout: React.FC<MyComponentProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        style={{ background: colorBgContainer }}
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <h2 className="text-center text-[24px] px-2 py-5">
          <img src={logo} alt="logo" />
        </h2>
        <AsideBar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
