import { Form, Checkbox, type CheckboxProps } from "antd";
import type { Rule } from "antd/es/form";

// ✅ Định nghĩa kiểu dữ liệu cho options trong Checkbox Group
type Options = {
    label: string;  // Nhãn hiển thị cho checkbox
    value: string;  // Giá trị của checkbox
    disabled?: boolean; // Có thể disable checkbox
    checked?: boolean;
};

// ✅ Định nghĩa Props cho Component Checkbox
interface BaseCheckboxProps extends Omit<CheckboxProps, "name"> {
    name: string;  // Tên field trong form
    label?: string;  // Nhãn hiển thị trên form
    required?: boolean;  // Nếu true, checkbox là bắt buộc
    rules?: Rule[];  // Danh sách rule validation của Ant Design
    errorMessage?: string;  // Thông báo lỗi nếu required = true
    options?: Options[];  // Danh sách options cho Checkbox Group (nếu có)
    onChange?: (checkedValues: string[] | boolean) => void; // Hàm callback khi giá trị thay đổi
}

// ✅ Component Checkbox chung, hỗ trợ cả Checkbox đơn & Checkbox Group
export const CommonCheckbox = ({
                                   name,
                                   label,
                                   required = false,
                                   rules = [],
                                   errorMessage,
                                   options,
                                   onChange,
                                   ...checkboxProps
                               }: BaseCheckboxProps) => {
    // 🎯 Xử lý danh sách validation rules
    const validationRules: Rule[] = [
        ...(required ? [{ required: true, message: errorMessage || `${label || name} is required` }] : []),
        ...rules,
    ];

    // 🎯 Hàm xử lý sự kiện thay đổi checkbox
    const handleCheckboxChange = (checkedValues: any) => {
        // Nếu có hàm onChange từ cha truyền xuống, gọi nó với dữ liệu đã xử lý
        if (onChange) {
            onChange(checkedValues);
        }
    };

    return (
        <Form.Item
            name={name}
            label={label}
            rules={validationRules}
            valuePropName={options ? "value" : "checked"} // Tự động chọn prop name phù hợp
        >
            {options ? (
                // 🎯 Trường hợp Checkbox Group (Danh sách nhiều checkbox)
                <Checkbox.Group options={options} {...checkboxProps} onChange={handleCheckboxChange} />
            ) : (
                // 🎯 Trường hợp Checkbox đơn
                <Checkbox {...checkboxProps} onChange={(e) => handleCheckboxChange(e.target.checked)} />
            )}
        </Form.Item>
    );
};
