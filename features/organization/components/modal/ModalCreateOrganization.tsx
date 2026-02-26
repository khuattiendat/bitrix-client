"use client";

import { Form, Input, Modal, Switch } from "antd";
import { organizationService } from "../../services/organization.service";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { Organization } from "../../types/organization.type";
import { useEffect } from "react";

interface ModalCreateOrganizationProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectData?: (data?: Organization) => void;
  setIsEdit?: (isEdit: boolean) => void;
  data?: Organization;
  isEdit?: boolean;
}

interface CreateOrganizationForm {
  name: string;
  taxCode: string;
  address: string;
  status?: boolean;
}

const ModalCreateOrganization = (props: ModalCreateOrganizationProps) => {
  const {
    isOpen,
    onClose,
    data,
    isEdit = false,
    setIsEdit,
    setSelectData,
  } = props;
  const [form] = Form.useForm<CreateOrganizationForm>();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit) {
        const payload = {
          ...values,
          status: values.status ? "active" : "suspended",
        };
        await organizationService.updateOrganization(data?.id!, payload);
        toast.success("Cập nhật tổ chức thành công");
      } else {
        await organizationService.createOrganization(values);
        toast.success("Tạo tổ chức thành công");
      }

      mutate(
        (key: unknown) => Array.isArray(key) && key[0] === "list-orgs",
        undefined,
        { revalidate: true },
      );
      setSelectData?.(undefined);
      setIsEdit?.(false);
      form.resetFields();
      onClose();
    } catch (error: any) {
      console.log("Error:", error);

      const fallback = isEdit
        ? "Cập nhật tổ chức thất bại"
        : "Tạo tổ chức thất bại";
      const message = error?.response?.data?.message;
      const errorMessage = Array.isArray(message) ? message[0] : message;
      toast.error(errorMessage || fallback);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };
  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data.name,
        taxCode: data.taxCode,
        address: data.address,
        status: data.status === "active",
      });
    } else {
      form.resetFields();
    }
  }, [data, isEdit, form]);

  return (
    <Modal
      title={isEdit ? "Cập nhật tổ chức" : "Tạo tổ chức"}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      okText={isEdit ? "Cập nhật" : "Tạo"}
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên tổ chức"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên tổ chức" },
            { max: 255, message: "Tên tổ chức không được vượt quá 255 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tên tổ chức" />
        </Form.Item>

        <Form.Item
          label="Mã số thuế"
          name="taxCode"
          rules={[
            { required: true, message: "Vui lòng nhập mã số thuế" },
            {
              pattern: /^[0-9]{10}(-[0-9]{3})?$/,
              message:
                "Mã số thuế gồm 10 chữ số hoặc 10-3 chữ số (VD: 0123456789 hoặc 0123456789-001)",
            },
          ]}
        >
          <Input placeholder="Nhập mã số thuế" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ" },
            { max: 500, message: "Địa chỉ không được vượt quá 500 ký tự" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
        </Form.Item>
        {isEdit && (
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Switch
              checkedChildren="Đang hoạt động"
              unCheckedChildren="Không hoạt động"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalCreateOrganization;
