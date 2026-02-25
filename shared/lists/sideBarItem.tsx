import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { GoOrganization } from "react-icons/go";

export const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link href="/admin/users">Người dùng</Link>,
  },
  {
    key: "2",
    icon: <GoOrganization />,
    label: <Link href="/admin/orgs">Tổ chức</Link>,
  },
];
