import { Avatar, Popconfirm, Select, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  OrganizationUser,
  User,
  userStatus,
} from "@/features/auth/types/auth.type";
import { OrganizationMemberRole } from "@/shared/enums/organization.enum";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import dayjs from "dayjs";
import { userService } from "../services/user.service";
import { toast } from "react-toastify";
import { OrganizationWithRole } from "../components/UserForm";
import { IoMdClose } from "react-icons/io";
import { mutate } from "swr";
import { useAuth } from "@/features/auth";

const ActionColumn = ({ user }: { user: User }) => {
  const { user: userLoginted } = useAuth();

  const handleDelete = () => {
    if (user.id === userLoginted?.id) {
      toast.error("Bạn không thể xóa chính mình!");
      return;
    }
    userService.deleteUser(+user.id).then(() => {
      toast.success("Xóa người dùng thành công");
      mutate(
        (key: unknown) => Array.isArray(key) && key[0] === "list-users",
        undefined,
        { revalidate: true },
      );
    });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Tooltip title="Chỉnh sửa">
        <Link href={`/admin/users/edit/${user.id}`} className="text-blue-600">
          <FaRegEdit size={20} />
        </Link>
      </Tooltip>
      <Tooltip title="Xóa người dùng">
        <Popconfirm
          title="Xóa người dùng"
          description="Xác nhận xóa người dùng này?"
          onConfirm={handleDelete}
          okText="Đồng ý"
          cancelText="Hủy bỏ"
        >
          <div className="text-red-600 cursor-pointer">
            <MdDelete size={20} />
          </div>
        </Popconfirm>
      </Tooltip>
    </div>
  );
};

export const userTableColumns: ColumnsType<User> = [
  {
    title: "STT",
    key: "index",
    width: 60,
    render: (_: unknown, __: unknown, index: number) => index + 1,
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    width: 80,
    render: (avatar?: string) => <Avatar src={avatar} />,
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Ngày sinh",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    render: (date: string | null) => (
      <span>{date ? dayjs(date).format("DD/MM/YYYY") : "-"}</span>
    ),
  },
  {
    title: "Công ty tham gia",
    dataIndex: "organizations",
    width: 300,
    key: "organizations",
    render: (organizations: OrganizationUser[]) =>
      !organizations?.length ? (
        "-"
      ) : (
        <div className="flex flex-wrap gap-2">
          {organizations.map((org) => (
            <Tag key={org.id} color="blue">
              {org.name} ({OrganizationMemberRole[org.organizationRole]})
            </Tag>
          ))}
        </div>
      ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: userStatus) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status === "active" ? "Đang hoạt động" : "Đã bị khóa"}
      </Tag>
    ),
  },
  {
    title: "Hành động",
    key: "action",
    width: 100,
    render: (_: unknown, user: User) => <ActionColumn user={user} />,
  },
];
export const getOrganizationTableColumns = (
  handleRoleChange: (orgId: number, role: any) => void,
  handleRemoveOrg: (record: OrganizationWithRole) => void,
): ColumnsType<OrganizationWithRole> => [
  {
    title: "STT",
    width: 60,
    render: (_: unknown, __: unknown, index: number) => index + 1,
  },
  {
    title: "Tên tổ chức",
    dataIndex: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    render: (v: string) => v || "-",
  },
  {
    title: "Chức vụ",
    width: 220,
    render: (_: unknown, record: OrganizationWithRole) => {
      const options = Object.entries(OrganizationMemberRole).map(
        ([key, value]) => ({
          value: key.toLowerCase(),
          label: value,
        }),
      );
      return (
        <Select
          value={record.role}
          style={{ width: 160 }}
          onChange={(value) => handleRoleChange(record.id, value)}
          options={options}
        />
      );
    },
  },
  {
    title: "Hành động",
    width: 80,
    render: (_: unknown, record: OrganizationWithRole) => (
      <button
        onClick={() => handleRemoveOrg(record)}
        className="text-red-600 hover:text-red-800 cursor-pointer"
      >
        <IoMdClose size={18} />
      </button>
    ),
  },
];
