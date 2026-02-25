"use client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import Heading from "@/shared/components/Heading";
import { Card, Table, Pagination, Button } from "antd";
import useSWR from "swr";
import { userService } from "../services/user.service";
import { userTableColumns } from "../table/user.column";
import InputSearchV2 from "@/shared/components/InputSearch";
import Link from "next/link";

const UserTable = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });

  const { data, error, isLoading } = useSWR(
    ["list-users", filters.page, filters.limit, filters.search],
    ([_, page, limit, search]) =>
      userService.fetchUsers(`page=${page}&limit=${limit}&search=${search}`),
  );
  const dataExam = data?.data;
  const metData = data?.meta;
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ ...filters, search: value, page: 1 });
  };
  if (error) {
    return <div>Error loading users.</div>;
  }

  return (
    <Card>
      <div className="flex justify-between items-center">
        <Heading title="Danh sách người dùng" />
        <Link href="/admin/users/create">
          <Button type="primary">Thêm người dùng</Button>
        </Link>
      </div>
      <div className="mb-4">
        <InputSearchV2 onChange={handleSearchChange} classInput="w-fit!" />
      </div>
      <Table
        rowKey="id"
        dataSource={dataExam ?? []}
        columns={userTableColumns}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        pagination={false}
      />
      <div className="flex justify-end mt-4">
        <Pagination
          pageSize={filters.limit}
          current={filters.page}
          total={metData?.total || 0}
          onChange={(page, pageSize) =>
            setFilters({ ...filters, page, limit: pageSize })
          }
        />
      </div>
    </Card>
  );
};

export default UserTable;
