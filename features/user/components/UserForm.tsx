"use client";

import { organizationService } from "@/features/organization/services/organization.service";
import {
  Organization,
  OrganizationMemberRole,
} from "@/features/organization/types/organization.type";
import useDebounceValue from "@/shared/hooks/useDebounceValue";
import { DatePicker, Form, Input, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useSWR from "swr";
import useUserForm from "../hooks/useUserForm";

interface OrganizationWithRole extends Organization {
  role: OrganizationMemberRole;
}

interface UserFormValues {
  fullName: string;
  email: string;
  dateOfBirth: any;
  password: string;
}

const UserForm = () => {
  const [form] = Form.useForm<UserFormValues>();

  const { setDataUser, setDatarganizations, setError } = useUserForm();

  const [searchOrg, setSearchOrg] = useState("");
  const [dataTable, setDataTable] = useState<OrganizationWithRole[]>([]);
  const [dataSelect, setDataSelect] = useState<
    { label: string; value: number }[]
  >([]);

  const debouncedSearchOrg = useDebounceValue(searchOrg, 500);

  const { data, isLoading } = useSWR(
    ["organizations", debouncedSearchOrg],
    ([_, keyword]) =>
      organizationService.getAllOrganizations(`search=${keyword}`),
  );

  useEffect(() => {
    if (!data?.data) return;

    setDataSelect(
      data.data.map((org: Organization) => ({
        label: org.name,
        value: org.id,
      })),
    );
  }, [data]);

  const syncOrganizations = (orgs: OrganizationWithRole[]) => {
    setDatarganizations(
      orgs.map((org) => ({
        id: org.id,
        organizationRole: org.role,
      })),
    );
  };

  const handleSelectOrg = (value: number) => {
    const selectedOrg = data?.data.find(
      (org: Organization) => org.id === value,
    );
    if (!selectedOrg) return;

    setDataTable((prev) => {
      if (prev.some((org) => org.id === value)) return prev;

      const updated = [
        ...prev,
        { ...selectedOrg, role: "member" as OrganizationMemberRole },
      ];

      syncOrganizations(updated);
      return updated;
    });

    setDataSelect((prev) => prev.filter((o) => o.value !== value));
  };

  const handleRoleChange = (orgId: number, role: OrganizationMemberRole) => {
    setDataTable((prev) => {
      const updated = prev.map((org) =>
        org.id === orgId ? { ...org, role } : org,
      );
      syncOrganizations(updated);
      return updated;
    });
  };

  const handleRemoveOrg = (org: OrganizationWithRole) => {
    setDataTable((prev) => {
      const updated = prev.filter((o) => o.id !== org.id);
      syncOrganizations(updated);
      return updated;
    });

    setDataSelect((prev) => [...prev, { label: org.name, value: org.id }]);
  };
  const handleFormChange = (_: unknown, allValues: UserFormValues) => {
    setDataUser({
      ...allValues,
      dateOfBirth: allValues.dateOfBirth
        ? allValues.dateOfBirth.format("YYYY-MM-DD")
        : null,
    });
  };

  const columns = [
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

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
        onFinishFailed={() => setError(true)}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <Form.Item
          label="Tên người dùng"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập email hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>

      <div>
        <div className="text-2xl font-bold mb-4">Tổ chức</div>

        <div className="flex justify-end mb-4">
          <Select
            showSearch
            allowClear
            placeholder="Chọn tổ chức"
            style={{ width: 240 }}
            options={dataSelect}
            loading={isLoading}
            onSearch={setSearchOrg}
            filterOption={false}
            onChange={handleSelectOrg}
          />
        </div>

        <Table
          rowKey="id"
          dataSource={dataTable}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default UserForm;
