"use client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import Heading from "@/shared/components/Heading";
import InputSearchV2 from "@/shared/components/InputSearch";
import { Button, Card, Pagination, Table } from "antd";
import useSWR, { mutate } from "swr";
import { organizationService } from "@/features/organization/services/organization.service";
import { ChangeEvent, useState } from "react";
import { Organization } from "@/features/organization/types/organization.type";
import { toast } from "react-toastify";
import ModalCreateOrganization from "../modal/ModalCreateOrganization";
import { getOrganizationTableColumns } from "../../table/organization.table";

const OrgnizationTable = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [dataSelected, setDataSelected] = useState<Organization>();
  const [isEdit, setIsEdit] = useState(false);
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
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ ...filters, search: value, page: 1 });
  };
  if (error) {
    return <div>Error loading users.</div>;
  }
  const OrganizationTableColumns = getOrganizationTableColumns({
    onDelete: async (id) => {
      await organizationService.deleteOrganization(parseInt(id));
      setDataSelected(undefined);
      setIsEdit(false);
      toast.success("Xóa tổ chức thành công");
      mutate(
        (key: unknown) => Array.isArray(key) && key[0] === "list-orgs",
        undefined,
        { revalidate: true },
      );
    },
    onEdit: (record) => {
      setDataSelected(record);
      setIsEdit(true);
      setOpenModalCreate(true);
    },
  });

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center">
          <Heading title="Danh sách tổ chức" />
          <Button type="primary" onClick={() => setOpenModalCreate(true)}>
            Thêm tổ chức
          </Button>
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
      {openModalCreate && (
        <ModalCreateOrganization
          isOpen={openModalCreate}
          onClose={() => setOpenModalCreate(false)}
          data={dataSelected}
          isEdit={isEdit}
          setSelectData={setDataSelected}
          setIsEdit={setIsEdit}
        />
      )}
    </div>
  );
};
export default OrgnizationTable;
