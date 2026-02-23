import { Avatar, Popconfirm, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { OrganizationUser, User } from "@/features/auth/types/auth.type";
import { OrganizationMemberRole } from "@/shared/enums/organization.enum";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import moment from "moment";
import { userService } from "../services/user.service";

export const userTableColumns: ColumnsType<User> = [
  {
    title: "STT",
    key: "index",
    width: 60,
    render: (_: any, __: any, index: number) => index + 1,
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
      <div>{date ? moment(date).format("DD/MM/YYYY") : "-"}</div>
    ),
  },
  {
    title: "Công ty tham gia",
    dataIndex: "organizations",
    key: "organizations",
    render: (organizations: OrganizationUser[]) =>
      !organizations?.length ? (
        "-"
      ) : (
        <div className="flex flex-wrap gap-1">
          {organizations.map((org) => (
            <Tag key={org.id} color="blue">
              {org.name} ({OrganizationMemberRole[org.organizationRole]})
            </Tag>
          ))}
        </div>
      ),
  },
  {
    title: "Hành động",
    key: "action",
    render: (user: User) => (
      <div className="flex items-center justify-center  gap-2">
        <Tooltip title="Chỉnh sửa">
          <Link
            href={`/admin/users/edit/${user.id}`}
            className="text-blue-600 hover:underline mr-2"
          >
            <FaRegEdit className="" size={20} />
          </Link>
        </Tooltip>
        <Tooltip title="Xóa người dùng">
          <Popconfirm
            title="Xóa người dùng"
            description="Xác nhận xóa người dùng này?"
            onConfirm={() => {
              userService.deleteUser(+user.id).then(() => {});
            }}
            onCancel={() => {
              console.log("Canceled");
            }}
            okText="Đồng ý"
            cancelText="hủy bỏ"
          >
            <div className="text-red-600 cursor-pointer">
              <MdDelete size={20} />
            </div>
          </Popconfirm>
        </Tooltip>
      </div>
    ),
  },
];
export default userTableColumns;
