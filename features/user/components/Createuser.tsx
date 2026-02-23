"use client";
import Heading from "@/shared/components/Heading";
import { Button, Card, Form } from "antd";
import UserForm from "./UserForm";
import useUserForm from "../hooks/useUserForm";
import { useEffect, useMemo, useState } from "react";
import { userService } from "../services/user.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Createuser = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(true);
  const {
    dateOfBirth,
    email,
    fullName,
    organizations,
    password,
    error,
    setDataUser,
    setDatarganizations,
    setError,
  } = useUserForm();
  const resetForm = () => {
    setDataUser({
      fullName: "",
      email: "",
      dateOfBirth: "",
      password: "",
    });
    setDatarganizations([]);
    setError(false);
  };
  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  useMemo(() => {
    const validate =
      !dateOfBirth ||
      !email ||
      !fullName ||
      !password ||
      error ||
      organizations?.length === 0;
    setDisableButton(validate);
  }, [dateOfBirth, email, fullName, password, organizations, error]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const allValues = {
        fullName,
        email,
        dateOfBirth,
        organizations,
        password,
      };
      const response = await userService.createUser(allValues);
      const { success } = response;
      if (!success) {
        setLoading(false);
        toast.error("Failed to create user. Please try again.");
        return;
      }
      toast.success("User created successfully!");
      resetForm();
      const userId = response.data.id;
      router.push(`/admin/users/edit/${userId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create user. Please try again.",
      );
    }
  };

  return (
    <div>
      <Card>
        <div className="flex justify-between">
          <Heading title="Thêm mới người dùng" />
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={disableButton || loading}
          >
            Lưu
          </Button>
        </div>
        <UserForm />
      </Card>
    </div>
  );
};
export default Createuser;
