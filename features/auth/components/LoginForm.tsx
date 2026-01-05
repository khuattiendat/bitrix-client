// features/auth/components/LoginForm.tsx
"use client";
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Card, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login values:", values);

      // For actual API call:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      // const data = await response.json();

      alert("Login successful!");
      await login(values);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <Title level={2} className="!mb-2 !text-gray-800">
            Company Portal
          </Title>
          <Text type="secondary" className="text-base">
            Internal Employee Login
          </Text>
        </div>

        <Card
          className="shadow-xl border-0"
          styles={{ body: { padding: "40px 32px" } }}
        >
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
              label={
                <span className="font-medium text-gray-700">Email Address</span>
              }
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
                className="!mb-0"
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

            <Form.Item className="!mb-4">
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
  );
}
