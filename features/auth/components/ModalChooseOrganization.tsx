import { Modal } from "antd";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { OrganizationUser } from "../types/auth.type";
interface ModalChooseOrganizationProps {
  open: boolean;
  onClose: () => void;
  onSelect: (organizationId: number) => void;
  organizations?: OrganizationUser[];
}
const ModalChooseOrganization = (props: ModalChooseOrganizationProps) => {
  const { open, onClose, organizations, onSelect } = props;
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const onSelectOrg = (orgId: number) => {
    setSelectedOrg(orgId);
  };
  const handelOk = () => {
    if (selectedOrg !== null) {
      onSelect(selectedOrg);
      onClose();
    }
    setSelectedOrg(null);
    onClose();
  };

  return (
    <Modal
      title="Chọn tổ chức"
      open={open}
      onCancel={onClose}
      centered
      okText="Chọn"
      cancelText="Hủy"
      onOk={handelOk}
    >
      <div className="flex flex-col gap-3">
        {organizations?.map((org) => (
          <div
            key={org.id}
            onClick={() => onSelectOrg(org.id)}
            className="
              cursor-pointer
              rounded-lg
              border
              p-4
              transition
              hover:border-blue-500
              hover:bg-blue-50
              select-none
              relative
            "
          >
            <div className="text-base font-semibold">{org.name}</div>
            <div className="text-sm text-gray-500">
              Vai trò: {org.organizationRole}
            </div>
            {selectedOrg === org.id && (
              <div className="absolute top-1/2 right-4 text-green-500 text-lg transform -translate-y-1/2">
                <CheckOutlined />
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default ModalChooseOrganization;
