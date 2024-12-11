import React, { ReactNode } from "react";
import { Layout, theme } from "antd";
import Navbar from "@/shared/common/Navbar";
interface MyComponentProps {
  children: ReactNode;
}

const { Content } = Layout;

const LayoutFront: React.FC<MyComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Navbar />
      <Content
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="mx-auto max-w-[1300px] w-full">
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutFront;
