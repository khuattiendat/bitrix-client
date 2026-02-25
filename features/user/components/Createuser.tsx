"use client";
import Heading from "@/shared/components/Heading";
import { Button, Card, Form } from "antd";
import UserForm from "./UserForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreateUserRequest } from "../type/user.type";
import { userService } from "../services/user.service";

const Createuser = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<CreateUserRequest>({
    fullName: "",
    email: "",
    dateOfBirth: null,
    password: "",
    organizations: [],
  });
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!userData.fullName || !userData.email || !userData.password) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
        return;
      }
      if (userData.organizations.length === 0) {
        toast.error("Vui lòng chọn ít nhất một tổ chức cho người dùng.");
        return;
      }
      await userService.createUser(userData);
      toast.success("User created successfully!");
      router.push("/admin/users");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create user. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex justify-between">
        <Heading title="Thêm mới người dùng" />
        <Button type="primary" onClick={handleSubmit} disabled={loading}>
          Lưu
        </Button>
      </div>
      <UserForm userData={userData} setUserData={setUserData} />
    </Card>
  );
};
export default Createuser;
