"use client";
import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Card, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { authService } from "../services/auth.service";
import {
  AuthResponse,
  LoginPayload,
  OrganizationUser,
  SYSTEM_ROLE,
} from "../types/auth.type";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";
import ModalChooseOrganization from "./ModalChooseOrganization";
import Image from "next/image";

const { Title, Text } = Typography;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const [showModalChooseOrg, setShowModalChooseOrg] = useState(false);
  const [organizations, setOrganizations] = useState<OrganizationUser[]>([]);

  const onFinish = async (values: any) => {
    setLoading(true);
    setError("");

    try {
      if (!values.email || !values.password) {
        setError("Vui lòng nhập email và mật khẩu.");
        setLoading(false);
        return;
      }
      const payload: LoginPayload = {
        email: values.email,
        password: values.password,
      };
      const response: AuthResponse = await authService.login(payload);
      const { tokens, user } = response.data;
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setAuth(user, tokens.accessToken);
      const { systemRole, organizations } = user;
      if (systemRole === SYSTEM_ROLE.ADMIN) {
        router.replace("/admin");
        return;
      }

      if (!organizations.length) {
        setError("Tài khoản của bạn chưa được gán vào tổ chức nào.");
        setLoading(false);
        return;
      }
      if (organizations.length > 1) {
        setShowModalChooseOrg(true);
        setOrganizations(organizations);
      } else {
        router.replace(`/org/${organizations[0].id}`);
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };
  const onSelectOrganization = (organizationId: number) => {
    router.push(`/org/${organizationId}`);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
            </div>
            <Title level={2} className="!mb-2 !text-gray-800">
              Company Portal
            </Title>
          </div>

          <Card className="shadow-xl border-0">
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                onClose={() => setError("")}
                className="mb-6"
              />
            )}

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              requiredMark={false}
            >
              <Form.Item
                name="email"
                label={<span className="font-medium text-gray-700">Email</span>}
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="employee@company.com"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="font-medium text-gray-700">Password</span>
                }
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  className="rounded-lg"
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-6">
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className="mb-0!"
                >
                  <Checkbox>
                    <span className="text-sm text-gray-600">Remember me</span>
                  </Checkbox>
                </Form.Item>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>

              <Form.Item className="mb-4!">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-12 rounded-lg font-semibold text-base bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <div className="text-center mt-8 space-y-2">
            <Text type="secondary" className="text-sm">
              © 2026 Company Name. All rights reserved.
            </Text>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      {showModalChooseOrg && organizations.length > 0 && (
        <ModalChooseOrganization
          open={showModalChooseOrg}
          onClose={() => setShowModalChooseOrg(false)}
          organizations={organizations}
          onSelect={onSelectOrganization}
        />
      )}
    </>
  );
}
