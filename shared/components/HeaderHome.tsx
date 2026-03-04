import { Avatar, Input } from "antd";
import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import LiveClock from "./LiveClock";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useThemeStore } from "../store/theme.store";
const HeaderHome = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const { toggleSidebar } = useThemeStore();
  return (
    <header className="h-[64px] bg-[#535c69] flex items-center px-4 gap-4 shrink-0">
      <button
        className="text-gray-400 hover:text-white cursor-pointer"
        onClick={toggleSidebar}
      >
        <MenuOutlined className="text-xl" />
      </button>
      <Link
        href=""
        className="flex items-center gap-2 px-4 py-3 border-gray-100"
      >
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-800 text-sm shadow">
          M
        </div>
        <span className="font-bold text-lg tracking-wide text-blue-300">
          LOTUSA
        </span>
      </Link>
      <div
        className={cn(
          "flex-1 max-w-xl flex px-4 py-1 rounded-[20px] transition duration-300",
          inputFocused ? "bg-white" : "bg-[#717a84]",
        )}
      >
        <Input
          placeholder="find people, documents, and more"
          variant="borderless"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          classNames={{
            input: cn(
              " placeholder:!text-gray-400 !text-base",
              inputFocused ? "!text-black" : "!text-gray-300",
            ),
          }}
        />
        <SearchOutlined color="gray" />
      </div>
      <div className="ml-auto flex items-center gap-3 h-full">
        <LiveClock />

        <div className="flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 px-2 py-1 rounded-lg">
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ background: "#6c8ebf" }}
          />
          <span className="text-sm">Khuất Tiến Đạt</span>
          <span className="text-gray-400 text-xs">▾</span>
        </div>

        <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer">
          ?
        </div>
      </div>
    </header>
  );
};
export default HeaderHome;
