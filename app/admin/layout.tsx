"use client";
import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import AdminProvider from "@/middleware/AdminProvider";
import Link from "next/link";
import { useAuth } from "@/features/auth";
import { items } from "@/shared/lists/sideBarItem";
import { authService } from "@/features/auth/services/auth.service";
import { useRouter } from "next/navigation";

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

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await authService.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("auth-storage");
    logout();
    router.push("/login");
  };

  const dropdownItems = {
    items: [
      {
        key: "profile",
        label: <span className="font-medium">{user?.fullName}</span>,
        disabled: true,
      },
      { type: "divider" as const },
      {
        key: "logout",
        label: "Đăng xuất",
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

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
            <Link
              href="/admin"
              className="text-center w-full font-bold uppercase"
            >
              Admin
            </Link>
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
            <div className="flex items-center justify-between h-full px-4">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />

              <Dropdown
                menu={dropdownItems}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">
                  <Avatar
                    src={user?.avatar}
                    icon={!user?.avatar && <UserOutlined />}
                    className="bg-blue-500"
                  />
                  <span className="font-medium text-sm hidden md:block">
                    {user?.fullName}
                  </span>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content className="p-4">{children}</Content>
        </Layout>
      </Layout>
    </AdminProvider>
  );
};

export default LayoutAdmin;
