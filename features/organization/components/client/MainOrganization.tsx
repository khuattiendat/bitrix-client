"use client";

import { Button, Input, Tabs } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import FeedPost from "@/shared/components/FeedPost";
import RightSidebar from "@/shared/components/RightSidebar";

const { TabPane } = Tabs;
const feedPosts = [
  {
    id: 1,
    author: "Bùi Quang Kiên",
    to: "Bùi Quang Kiên, Phạm Thành Trung, An Nhật Quang  and 7 more recipients",
    time: "February 4 9:02 am",
    title: "DEADLINE LACKING for Task",
    taskLink:
      "KiteEdu / [BE-Roles & Permission]: Update design phân quyền cho API",
    status: "Completed, under review",
    statusColor: "green",
    important: "Yes",
    overdue: "No",
    estimatedTime: "0(h)",
    duration: "0",
    createdBy: "Phạm Thành Trung",
    responsible: "Bùi Quang Kiên",
    observers:
      "An Nhật Quang, Đỗ Hữu Trung, Hoàng Quang Hiếu, Phan Đức Mạnh, Đặng Quốc Dương, Nguyễn Quốc Trung, Khuất Tiến Đạt, Nguyễn Văn Cường.",
    views: 9,
  },
  {
    id: 2,
    author: "Bùi Quang Kiên",
    to: "Bùi Quang Kiên, Phạm Thành Trung, Hoàng Quang Hiếu  and 7 more recipients",
    time: "February 2 1:49 pm",
    title: "DEADLINE LACKING for Task",
    taskLink:
      "KiteEdu / [BE-Roles & Permission]: Update design phân quyền cho API",
    status: "In progress",
    statusColor: "blue",
    important: "Yes",
    overdue: "No",
    estimatedTime: "0(h)",
    duration: "0",
    createdBy: "Phạm Thành Trung",
    responsible: "Bùi Quang Kiên",
    observers: "An Nhật Quang, Đỗ Hữu Trung, Hoàng Quang Hiếu.",
    views: 6,
  },
];
const MainContent = () => {
  return (
    <div className="flex-1 flex min-w-0 bg-[#f5f6f8] overflow-y-auto">
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-5 pt-3 shrink-0">
          <Input
            placeholder="Send message …"
            className="mb-3 text-gray-400 text-sm"
            style={{
              background: "#f9fafb",
              borderColor: "#e5e7eb",
              borderRadius: 6,
            }}
            readOnly
          />
          <Tabs
            defaultActiveKey="message"
            size="small"
            className="!mb-0"
            tabBarStyle={{ marginBottom: 0 }}
          >
            <TabPane
              tab={
                <span className="font-semibold text-xs tracking-wide">
                  MESSAGE
                </span>
              }
              key="message"
            />
            <TabPane
              tab={<span className="text-xs tracking-wide">TASK</span>}
              key="task"
            />
            <TabPane
              tab={<span className="text-xs tracking-wide">EVENT</span>}
              key="event"
            />
            <TabPane
              tab={<span className="text-xs tracking-wide">POLL</span>}
              key="poll"
            />
            <TabPane
              tab={<span className="text-xs tracking-wide">MORE ▾</span>}
              key="more"
            />
          </Tabs>
        </div>

        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Feed</h2>
            <div className="flex items-center gap-2">
              <Input
                size="small"
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Filter and search"
                className="w-44 rounded-lg"
              />
              <Button
                type="text"
                size="small"
                icon={<SettingOutlined className="text-gray-400" />}
              />
            </div>
          </div>

          {feedPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};
export default MainContent;
