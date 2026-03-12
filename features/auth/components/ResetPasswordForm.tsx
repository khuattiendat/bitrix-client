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
import { useRouter, useSearchParams } from "next/navigation";
import ModalChooseOrganization from "./ModalChooseOrganization";
import Image from "next/image";
import Link from "next/link";

const { Title, Text } = Typography;

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams.get("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onFinish = async (values: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      const { newPassword, newPasswordConfirm } = values;
      if (!newPassword?.trim() || !newPasswordConfirm?.trim()) {
        setError("Vui lòng nhập mật khẩu mới và xác nhận mật khẩu.");
        setLoading(false);
        return;
      }
      if (newPassword.trim() !== newPasswordConfirm.trim()) {
        setError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        setLoading(false);
        return;
      }
      const token = searchParams.get("token");
      if (!token) {
        setError("Token không hợp lệ. Vui lòng thử lại.");
        setLoading(false);
        return;
      }
      await authService.resetPassword(token, newPassword.trim());
      router.replace("/login");
    } catch (err) {
      console.log(err);
      setError("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="w-full max-w-md">
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
                name="newPassword"
                label={
                  <span className="font-medium text-gray-700">
                    Mật khẩu mới
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item
                name="newPasswordConfirm"
                label={
                  <span className="font-medium text-gray-700">
                    Nhập lại mật khẩu mới
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item className="mb-4!">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-12 rounded-lg font-semibold text-base bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg"
                >
                  Đặt lại mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};
export default ResetPasswordForm;
