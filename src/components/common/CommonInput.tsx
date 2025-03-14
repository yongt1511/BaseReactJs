import type { Rule } from "antd/es/form";
import { Form, Input, type InputProps } from "antd";
import React, { useState } from "react";

// 📌 Xác định các kiểu input hỗ trợ
type InputType = "input" | "password" | "textarea";

// 📌 Interface mở rộng cho component chung
interface BaseInputProps extends Omit<InputProps, "name" | "onChange"> {
    name: string; // Tên của input (bắt buộc)
    label?: string; // Nhãn hiển thị
    type?: InputType; // Loại input (input, password, textarea)
    required?: boolean; // Có bắt buộc nhập hay không
    rules?: Rule[]; // Các rule validation
    errorMessage?: string; // Thông báo lỗi tùy chỉnh
    onChange?: (value: string) => void; // Hàm gửi giá trị lên component cha
    customTransform?: (value: string) => string; // Xử lý dữ liệu trước khi gửi lên cha
    prefix?: React.ReactNode; // Icon bên trái
    suffix?: React.ReactNode; // Icon bên phải
    maxLength?: number; // Giới hạn số ký tự
    showCount?: boolean; // Hiển thị số ký tự đã nhập
    disabled?: boolean; // Có vô hiệu hóa input hay không
    readOnly?: boolean; // Chỉ đọc (không cho phép chỉnh sửa)
}

// 📌 Component chung
export const CommonInput = ({
                                     name,
                                     label,
                                     type = "input", // Mặc định là input
                                     required = false,
                                     rules = [],
                                     errorMessage,
                                     placeholder,
                                     prefix,
                                     suffix,
                                     onChange,
                                     maxLength = 50,
                                     showCount = false,
                                     disabled = false,
                                     readOnly = false,
                                     customTransform,
                                     ...inputProps
                                 }: BaseInputProps) => {
    // 🎯 State để lưu giá trị nhập vào
    const [inputValue, setInputValue] = useState<string>("");

    // 📌 Hàm xử lý khi giá trị input thay đổi
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newValue = e.target.value;

        // Nếu có customTransform, xử lý giá trị trước khi cập nhật
        if (customTransform) {
            newValue = customTransform(newValue);
        }

        setInputValue(newValue); // Cập nhật state nội bộ
        onChange?.(newValue); // Gửi giá trị đã xử lý lên component cha (nếu có)
    };

    // 📌 Danh sách rule validation
    const validationRules: Rule[] = [
        ...(required ? [{ required: true, message: errorMessage || `${label || name} is required` }] : []),
        ...rules,
    ];

    return (
        <Form.Item name={name} label={label} rules={validationRules}>
            {type === "password" ? (
                <Input.Password
                    placeholder={placeholder}
                    prefix={prefix}
                    suffix={suffix}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...inputProps}
                    value={inputValue}
                    onChange={handleChange} // Gọi hàm handleChange khi thay đổi giá trị
                />
            ) : type === "textarea" ? (
                <Input.TextArea
                    placeholder={placeholder}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...inputProps}
                    value={inputValue}
                    onChange={handleChange}
                />
            ) : (
                <Input
                    placeholder={placeholder}
                    prefix={prefix}
                    suffix={suffix}
                    maxLength={maxLength}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...inputProps}
                    value={inputValue}
                    onChange={handleChange}
                />
            )}
            {showCount && <div style={{ fontSize: "12px", color: "#888" }}>{inputValue.length}/{maxLength} ký tự</div>}
        </Form.Item>
    );
};
