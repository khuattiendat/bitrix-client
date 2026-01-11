"use client";
import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import AdminProvider from "@/middleware/AdminProvider";
import Link from "next/link";
import { GoOrganization } from "react-icons/go";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  background: "#fff",
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};
const headerStyle: React.CSSProperties = {
  padding: 0,
  background: "#fff",
  top: 0,
  zIndex: 1,
  width: "100%",
  position: "sticky",
};

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link href="/admin/users">Người dùng</Link>,
  },
  {
    key: "2",
    icon: <GoOrganization />,
    label: <Link href="/admin/orgs">Tổ chức</Link>,
  },
];
const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminProvider>
      <Layout hasSider>
        <Sider
          style={siderStyle}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="h-16 text-2xl flex justify-between items-center w-full">
            <span>Logo</span>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
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
          <Content className="">{children}</Content>
        </Layout>
      </Layout>
    </AdminProvider>
  );
};
export default LayoutAdmin;
