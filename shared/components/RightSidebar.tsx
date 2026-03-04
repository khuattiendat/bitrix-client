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
const RightSidebar = () => {
  return (
    <div className="w-[260px] bg-white border-l border-gray-200 flex flex-col shrink-0">
      {/* LIVE */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-red-500">LIVE</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            CLOCKED IN <span className="font-bold text-gray-700 ml-0.5">0</span>
            <span className="mx-1 text-gray-300">|</span>
            CLOCKED OUT{" "}
            <span className="font-bold text-gray-700 ml-0.5">0</span>
          </div>
          <button className="text-gray-300 hover:text-gray-500 text-xs">
            ✕
          </button>
        </div>
        <div className="flex gap-2">
          {["B", "T", "K"].map((l, i) => (
            <Avatar
              key={i}
              size={34}
              style={{ background: ["#4a7fc1", "#e85d5d", "#52c41a"][i] }}
            >
              {l}
            </Avatar>
          ))}
        </div>
      </div>

      {/* Company Pulse */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between bg-cyan-400 text-white rounded-lg px-3 py-2">
          <span className="text-xs font-bold tracking-wide">COMPANY PULSE</span>
          <div className="bg-white/25 rounded px-2 py-0.5 flex items-center gap-1.5">
            <span className="font-bold text-sm">0</span>
            <span className="text-xs">0%</span>
          </div>
        </div>
      </div>

      {/* My Tasks */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between bg-cyan-400 text-white rounded-t-lg px-3 py-2">
          <span className="text-xs font-bold tracking-wide">MY TASKS</span>
          <button className="w-5 h-5 bg-white/20 rounded flex items-center justify-center hover:bg-white/30">
            <PlusOutlined className="text-xs" />
          </button>
        </div>
        <div className="border border-t-0 border-gray-200 rounded-b-lg">
          {[
            { label: "Ongoing", count: 8, badgeVal: 0 },
            { label: "Assisting", count: 11, badgeVal: 1, red: true },
            { label: "Set by me", count: 0, badgeVal: 0 },
            { label: "Following", count: 11, badgeVal: 0 },
          ].map((item, idx, arr) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer ${idx < arr.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <span className="text-sm text-gray-600">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800 text-sm">
                  {item.count}
                </span>
                {item.badgeVal > 0 ? (
                  <span className="w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {item.badgeVal}
                  </span>
                ) : (
                  <span className="w-4 h-4 bg-green-400 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Birthdays */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="bg-orange-400 text-white text-xs font-bold tracking-wide rounded-t-lg px-3 py-2">
          BIRTHDAYS
        </div>
        <div className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-100">
          {[
            { name: "Bùi Quang Kiên", date: "June 29", bg: "#4a7fc1" },
            { name: "Trang Bùi", date: "September 23", bg: "#e85d5d" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <Avatar size={34} style={{ background: p.bg }}>
                {p.name[0]}
              </Avatar>
              <div>
                <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                  {p.name}
                </div>
                <div className="text-xs text-gray-400">{p.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Client */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="bg-teal-400 text-white text-xs font-bold tracking-wide rounded-t-lg px-3 py-2">
          DESKTOP CLIENT
        </div>
        <div className="border border-t-0 border-gray-200 rounded-b-lg p-3 flex justify-around">
          {[
            { label: "MAC OS", icon: "🍎" },
            { label: "WINDOWS", icon: "⊞" },
            { label: "LINUX", icon: "🐧" },
          ].map((os) => (
            <button
              key={os.label}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <span className="text-xl">{os.icon}</span>
              <span className="text-[10px] font-medium">{os.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile App */}
      <div className="px-3 py-2">
        <div className="bg-teal-400 text-white text-xs font-bold tracking-wide rounded-lg px-3 py-2">
          MOBILE APPLICATION
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;
