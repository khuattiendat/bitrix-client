"use client";

import { organizationService } from "@/features/organization/services/organization.service";
import {
  Organization,
  OrganizationMemberRole,
} from "@/features/organization/types/organization.type";
import useDebounceValue from "@/shared/hooks/useDebounceValue";
import { DatePicker, Form, Input, Select, Table } from "antd";
import { useEffect, useState, useCallback, useRef } from "react";
import useSWR from "swr";
import dayjs, { Dayjs } from "dayjs";
import { CreateUserRequest } from "../type/user.type";
import { getOrganizationTableColumns } from "../table/user.column";

export interface OrganizationWithRole extends Organization {
  role: OrganizationMemberRole;
}

interface UserFormProps {
  userData: CreateUserRequest;
  setUserData: (data: CreateUserRequest) => void;
}

const UserForm = ({ userData, setUserData }: UserFormProps) => {
  const [form] = Form.useForm<
    Omit<CreateUserRequest, "dateOfBirth"> & { dateOfBirth: Dayjs | null }
  >();

  const [searchOrg, setSearchOrg] = useState("");
  const [dataTable, setDataTable] = useState<OrganizationWithRole[]>([]);
  const [dataSelect, setDataSelect] = useState<
    { label: string; value: number }[]
  >([]);

  // Dùng ref để tránh stale closure, không gây re-render
  const userDataRef = useRef(userData);
  const isInitialized = useRef(false);

  const debouncedSearchOrg = useDebounceValue(searchOrg, 500);

  const { data, isLoading } = useSWR(
    ["organizations", debouncedSearchOrg],
    ([_, keyword]) =>
      organizationService.getAllOrganizations(`search=${keyword}`),
  );

  // Chỉ khởi tạo form + dataTable 1 lần duy nhất
  useEffect(() => {
    if (!userData || isInitialized.current) return;
    isInitialized.current = true;
    userDataRef.current = userData;

    form.setFieldsValue({
      fullName: userData.fullName || "",
      email: userData.email || "",
      dateOfBirth: userData.dateOfBirth ? dayjs(userData.dateOfBirth) : null,
      password: userData.password || "",
    });

    setDataTable(
      userData.organizations.map((org) => ({
        id: org.id,
        name: org.name,
        role: org.organizationRole as OrganizationMemberRole,
      })),
    );
  }, [userData, form]);

  // Cập nhật dataSelect khi data SWR thay đổi
  useEffect(() => {
    if (!data?.data) return;
    const selectedOrgIds = dataTable.map((org) => org.id);
    setDataSelect(
      data.data
        .filter((org: Organization) => !selectedOrgIds.includes(org.id))
        .map((org: Organization) => ({ label: org.name, value: org.id })),
    );
  }, [data, dataTable]);

  const syncOrganizationsToUserData = useCallback(
    (orgs: OrganizationWithRole[]) => {
      // Dùng ref thay vì userData trực tiếp để tránh stale closure
      userDataRef.current = {
        ...userDataRef.current,
        organizations: orgs.map((org) => ({
          id: org.id,
          name: org.name || "",
          organizationRole: org.role,
        })),
      };
      setUserData(userDataRef.current);
    },
    [setUserData],
  );

  const handleSelectOrg = useCallback(
    (value: number) => {
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
        syncOrganizationsToUserData(updated);
        return updated;
      });
    },
    [data, syncOrganizationsToUserData],
  );

  const handleRoleChange = useCallback(
    (orgId: number, role: OrganizationMemberRole) => {
      setDataTable((prev) => {
        const updated = prev.map((org) =>
          org.id === orgId ? { ...org, role } : org,
        );
        syncOrganizationsToUserData(updated);
        return updated;
      });
    },
    [syncOrganizationsToUserData],
  );

  const handleRemoveOrg = useCallback(
    (org: OrganizationWithRole) => {
      setDataTable((prev) => {
        const updated = prev.filter((o) => o.id !== org.id);
        syncOrganizationsToUserData(updated);
        return updated;
      });
    },
    [syncOrganizationsToUserData],
  );

  const handleFormChange = useCallback(
    (
      _: unknown,
      allValues: Omit<CreateUserRequest, "dateOfBirth"> & {
        dateOfBirth: Dayjs | null;
      },
    ) => {
      // Dùng ref để tránh tạo closure mới mỗi render
      userDataRef.current = {
        ...userDataRef.current,
        ...allValues,
        dateOfBirth: allValues.dateOfBirth
          ? allValues.dateOfBirth.toISOString()
          : null,
      };
      setUserData(userDataRef.current);
    },
    [setUserData],
  );

  const columns = getOrganizationTableColumns(
    handleRoleChange,
    handleRemoveOrg,
  );

  return (
    <div className="space-y-6">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
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
          <DatePicker
            className="w-full"
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
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
