"use client";
import Heading from "@/shared/components/Heading";
import { Button, Card, Form } from "antd";
import UserForm from "./UserForm";
import useUserForm from "../hooks/useUserForm";

const Createuser = () => {
  const { dateOfBirth, email, fullName, organizations } = useUserForm();
  const handleSubmit = () => {
    const allValues = { fullName, email, dateOfBirth, organizations };
    console.log("All Values: ", allValues);
  };

  return (
    <div>
      <Card>
        <div className="flex justify-between">
          <Heading title="Thêm mới người dùng" />
          <Button type="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
        <UserForm />
      </Card>
    </div>
  );
};
export default Createuser;
