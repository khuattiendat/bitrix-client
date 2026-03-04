import { Avatar } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
  SettingOutlined,
  EllipsisOutlined,
  EditOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
const IconRail = () => {
  return (
    <div className="w-10 bg-[#2a3142] flex flex-col items-center py-3 gap-5 shrink-0">
      {[
        BellOutlined,
        SearchOutlined,
        TeamOutlined,
        AppstoreOutlined,
        SettingOutlined,
      ].map((Icon, i) => (
        <button
          key={i}
          className="text-gray-400 hover:text-white transition-colors text-base"
        >
          <Icon />
        </button>
      ))}
      <div className="mt-auto flex flex-col gap-2 pb-2">
        {["#4a7fc1", "#e85d5d", "#52c41a", "#f59e0b", "#8b5cf6"].map((c, i) => (
          <Avatar key={i} size={28} style={{ background: c, fontSize: 10 }}>
            {["B", "T", "K", "A", "N"][i]}
          </Avatar>
        ))}
      </div>
    </div>
  );
};
export default IconRail;
