"use client";
import { useState } from "react";
import { useThemeStore } from "../store/theme.store";
import { cn } from "../lib/utils";
const navItems = [
  { label: "Feed", active: true },
  { label: "Tasks and Projects", badge: 2 },
  { label: "Workgroups" },
  { label: "Calendar" },
  { label: "Drive" },
  { label: "Chat and Calls" },
  { label: "Mail" },
  { label: "Company" },
  { label: "Services" },
  { label: "Developer resources" },
  { label: "Documents" },
  { label: "Inventory management" },
  { label: "Automation" },
  { label: "Mind Map" },
  { label: "Miro Boards" },
  { label: "B242GA" },
  { label: "Trello data migration" },
];
const LeftSidebar = () => {
  const [active, setActive] = useState("Feed");
  const { showSidebar } = useThemeStore();

  return (
    <aside
      className={cn(
        " bg-[#f5f6f8] flex flex-col h-full shrink-0 border-r border-gray-200",
        "transition-all duration-300",
        showSidebar ? "w-52" : "w-20",
      )}
    >
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`w-full flex items-center justify-between px-4 py-[7px] text-sm transition-all cursor-pointer
              ${
                active === item.label
                  ? "!bg-gray-200 !text-gray-600 font-semibold"
                  : "!text-gray-400 hover:!bg-gray-500"
              }`}
          >
            <span>{item.label}</span>
            {item.badge ? (
              <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}

        <button className="w-full flex items-center px-4 py-[7px] text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          More...
        </button>
      </nav>

      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400 space-y-1">
        <div className="hover:text-gray-600 cursor-pointer uppercase tracking-wide">
          Help
        </div>
        <div className="hover:text-gray-600 cursor-pointer uppercase tracking-wide">
          Sitemap
        </div>
        <div className="hover:text-gray-600 cursor-pointer uppercase tracking-wide">
          Configure Menu
        </div>
      </div>
    </aside>
  );
};
export default LeftSidebar;
