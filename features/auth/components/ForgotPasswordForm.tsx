"use client";
import { authService } from "@/features/auth/services/auth.service";
import { MailOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input } from "antd";
import { useState } from "react";
const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    setError("");
    try {
      const { email } = values;
      if (!email?.trim()) {
        setError("Vui lòng nhập email.");
        setLoading(false);
        return;
      }
      await authService.forgotPassword(email.trim());
      setSuccess(
        "Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.",
      );
    } catch (error) {
      console.log(error);
      setError(
        "Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại.",
      );
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
            {success && (
              <Alert
                message={success}
                type="success"
                showIcon
                closable
                onClose={() => setSuccess("")}
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

              <Form.Item className="mb-4!">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-12 rounded-lg font-semibold text-base bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg"
                >
                  Gửi yêu cầu đặt lại mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>{" "}
      </div>
    </>
  );
};
export default ForgotPasswordForm;
