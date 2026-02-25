"use client";
import Heading from "@/shared/components/Heading";
import { Button, Card } from "antd";
import UserForm from "./UserForm";
import { useParams } from "next/navigation";
import { userService } from "../services/user.service";
import useSWR from "swr";
import { useState } from "react";
import { UpdateUserRequest } from "../type/user.type";
import LoadingAuth from "@/shared/components/LoadingAuth";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [userData, setuserData] = useState<UpdateUserRequest>({
    fullName: "",
    email: "",
    dateOfBirth: null,
    password: "",
    organizations: [],
  });

  if (!id) return <div>Invalid user ID</div>;
  const { data, error, isLoading, isValidating } = useSWR(
    `${id}`,
    (id) => userService.findOneUser(id as unknown as number),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setuserData({
          fullName: data.fullName,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          password: "",
          organizations: data.organizations.map((org: any) => ({
            id: org.id,
            name: org.name,
            organizationRole: org.organizationRole,
          })),
        });
      },
    },
  );

  const handleSubmit = async () => {
    try {
      if (!userData.fullName || !userData.email || !userData.dateOfBirth) {
        toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
        return;
      }
      if (!userData.organizations.length) {
        toast.error("Vui lòng chọn ít nhất 1 công ty");
        return;
      }
      await userService.updateUser(id as unknown as number, userData);
      toast.success("Cập nhật người dùng thành công");
    } catch (error) {
      toast.error("Cập nhật người dùng thất bại");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading || isValidating)
    return (
      <div>
        <LoadingAuth size="small" />
      </div>
    );
  if (error) return <div>Error loading user data</div>;
  return (
    <Card>
      <div className="flex justify-between">
        <Heading title="Chỉnh sửa tài khoản" />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={disableButton || loading}
        >
          Lưu
        </Button>
      </div>
      {data && <UserForm userData={userData} setUserData={setuserData} />}
    </Card>
  );
};
export default EditUser;
