import { Organization } from "../types/organization.type";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Tag, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

interface OrganizationTableColumnsProps {
  onDelete?: (id: string) => void;
  onEdit?: (record: Organization) => void;
}

export const getOrganizationTableColumns = ({
  onDelete,
  onEdit,
}: OrganizationTableColumnsProps = {}): ColumnsType<Organization> => [
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
    title: "Mã số thuế",
    dataIndex: "taxCode",
    render: (v: string) => v || "-",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status: string) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status === "active" ? "Đang hoạt động" : "Không hoạt động"}
      </Tag>
    ),
  },
  {
    title: "Hành động",
    width: 100,
    render: (_: unknown, record: Organization) => (
      <div className="flex items-center justify-center gap-2">
        <Tooltip title="Chỉnh sửa">
          {onEdit ? (
            <div
              className="text-blue-600 cursor-pointer"
              onClick={() => onEdit(record)}
            >
              <FaRegEdit size={20} />
            </div>
          ) : (
            <Link href={`/admin/orgs/edit/${record.id}`}>
              <FaRegEdit size={20} className="text-blue-600 cursor-pointer" />
            </Link>
          )}
        </Tooltip>

        <Tooltip title="Xóa tổ chức">
          <Popconfirm
            title="Xóa tổ chức"
            description="Xác nhận xóa tổ chức này?"
            okText="Đồng ý"
            cancelText="Hủy bỏ"
            onConfirm={() => {
              onDelete?.(record.id);
            }}
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
