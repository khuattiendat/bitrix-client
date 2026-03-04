"use client";

import { useState } from "react";
import { Avatar, Button, Input } from "antd";
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
const FeedPost = ({ post }) => {
  const [comment, setComment] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex items-start gap-3">
          <Avatar
            size={38}
            style={{ background: "#4a7fc1", flexShrink: 0, fontSize: 16 }}
          >
            {post.author[0]}
          </Avatar>
          <div>
            <div className="text-sm leading-snug">
              <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                {post.author}
              </span>
              <span className="text-gray-400 mx-1">›</span>
              <span className="text-gray-500 text-xs">{post.to}</span>
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{post.time}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          <Button
            type="text"
            size="small"
            icon={<EllipsisOutlined />}
            className="text-gray-400"
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            className="text-gray-400"
          />
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="font-bold text-gray-800 text-sm mb-1">{post.title}</p>
        <p className="text-blue-500 text-sm cursor-pointer hover:underline mb-3">
          {post.taskLink}
        </p>

        <ul className="text-sm text-gray-600 space-y-[3px] list-disc list-inside leading-relaxed">
          <li>
            <span className="text-gray-500">Status: </span>
            <span
              className={
                post.statusColor === "green"
                  ? "text-green-600"
                  : "text-blue-600"
              }
            >
              {post.status}.
            </span>{" "}
            <em className="text-gray-500">Important:</em> {post.important}.{" "}
            <em className="text-gray-500">Overdue:</em> {post.overdue}.{" "}
            <em className="text-gray-500">Estimated time:</em>{" "}
            {post.estimatedTime}. <em className="text-gray-500">Duration:</em>{" "}
            {post.duration}.
          </li>
          <li className="text-gray-500 italic">
            Deadline: . Start date: . End date: .
          </li>
          <li>
            <em className="text-gray-600">Created by: </em>
            <span className="text-blue-500 cursor-pointer hover:underline not-italic">
              {post.createdBy}
            </span>
            .
          </li>
          <li>
            <em className="text-gray-600">Responsible person: </em>
            <span className="text-blue-500 cursor-pointer hover:underline not-italic">
              {post.responsible}
            </span>
            .
          </li>
          <li>
            <em className="text-gray-600">Participants: . Observers: </em>
            <span className="not-italic">{post.observers}</span>
          </li>
        </ul>
      </div>

      <div className="px-4 py-1.5 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-0">
          <Button
            type="text"
            size="small"
            className="!text-gray-500 !text-xs hover:!text-blue-500 px-2"
          >
            Comment
          </Button>
          <Button
            type="text"
            size="small"
            className="!text-gray-500 !text-xs hover:!text-orange-500 px-2"
          >
            Unfollow
          </Button>
          <Button
            type="text"
            size="small"
            className="!text-gray-500 !text-xs px-2"
          >
            More
          </Button>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>{post.views}</span>
        </div>
      </div>

      <div className="px-4 py-3 flex gap-3 items-center bg-gray-50">
        <Avatar
          size={30}
          icon={<UserOutlined />}
          style={{ background: "#6c8ebf", flexShrink: 0 }}
        />
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment"
          className="rounded-full text-sm"
          style={{ background: "white" }}
        />
      </div>
    </div>
  );
};

export default FeedPost;
