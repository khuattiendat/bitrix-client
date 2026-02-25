"use client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import Heading from "@/shared/components/Heading";
import InputSearchV2 from "@/shared/components/InputSearch";
import { Button, Card, Pagination, Table } from "antd";
import Link from "next/link";
import useSWR from "swr";
import { organizationService } from "../services/organization.service";
import { OrganizationTableColumns } from "../table/organization.table";

const OrgnizationTable = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });
  const { data, error, isLoading } = useSWR(
    ["list-orgs", filters.page, filters.limit, filters.search],
    ([_, page, limit, search]) =>
      organizationService.getAllOrganizations(
        `page=${page}&limit=${limit}&search=${search}`,
      ),
  );
  const dataOrg = data?.data;
  const metData = data?.meta;
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ ...filters, search: value, page: 1 });
  };
  if (error) {
    return <div>Error loading users.</div>;
  }
  return (
    <div>
      <Card>
        <div className="flex justify-between items-center">
          <Heading title="Danh sách tổ chức" />
          <Link href="/admin/users/create">
            <Button type="primary">Thêm tổ chức</Button>
          </Link>
        </div>
        <div className="mb-4">
          <InputSearchV2 onChange={handleSearchChange} classInput="w-fit!" />
        </div>
        <Table
          rowKey="id"
          dataSource={dataOrg ?? []}
          columns={OrganizationTableColumns}
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
    </div>
  );
};
export default OrgnizationTable;
