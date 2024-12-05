import React, { ReactNode } from "react";
import { Layout, theme } from "antd";
interface MyComponentProps {
  children: ReactNode;
}

const { Content } = Layout;

const PublicLayout: React.FC<MyComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content
          style={{
            padding: 24,
            minHeight: "70vh",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
    </Layout>
  );
};

export default PublicLayout;
