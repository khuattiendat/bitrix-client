"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="403"
        subTitle="Bạn không có quyền truy cập trang này."
        extra={[
          <Button key="home" type="primary" onClick={() => router.replace("/")}>
            Về trang chủ
          </Button>,
          <Button key="login" onClick={() => router.replace("/login")}>
            Đăng nhập lại
          </Button>,
        ]}
      />
    </div>
  );
}
