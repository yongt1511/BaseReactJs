import { Form, Button } from "antd";
import type { ButtonProps } from "antd/es/button";

/**
 * Định nghĩa kiểu `ButtonType` và `HtmlType`
 * - ButtonType: Các kiểu button của Ant Design
 * - HtmlType: Các giá trị `htmlType` được hỗ trợ trong thẻ `<button>`
 */
type ButtonType = "primary" | "dashed" | "link" | "text" | "default";
type HtmlType = "submit" | "reset" | "button";

/**
 * Interface cho `CommonButton`
 * - extends Omit<ButtonProps, "name" | "onClick"> để loại bỏ `name` & `onClick` từ ButtonProps (vì ta tự định nghĩa)
 */
interface BaseButtonProps extends Omit<ButtonProps, "name" | "onClick"> {
    name: string; // Định danh button, giúp phân biệt khi emit sự kiện
    label?: string; // Nhãn hiển thị trên button
    className?: string; // Cho phép truyền class tùy chỉnh
    htmlType?: HtmlType; // Loại button (submit, reset, button) - mặc định là "button"
    buttonType?: ButtonType; // Kiểu button của Ant Design - mặc định là "default"
    disabled?: boolean; // Có disable button hay không - mặc định là `false`
    onClick?: (name: string, event: React.MouseEvent<HTMLButtonElement>) => void; // Hàm onClick callback, emit sự kiện lên component cha
}

export const CommonButton: React.FC<BaseButtonProps> = ({
                                                            name,
                                                            label = "Button",
                                                            className = "",
                                                            htmlType = "button",
                                                            buttonType = "default",
                                                            disabled = false,
                                                            onClick,
                                                            ...buttonProps
                                                        }) => {
    /**
     * Hàm xử lý khi button được click
     * - Nếu có `onClick` từ component cha => gọi và truyền `name` cùng event
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(name, event);
        }
    };

    return (
        <Form.Item label={null} className={className}>
            <Button
                type={buttonType} // Định dạng kiểu button (primary, dashed, ...)
                htmlType={htmlType} // Kiểu button (submit, reset, button)
                name={name} // Định danh button
                className="mr-2" // Khoảng cách giữa các button
                onClick={handleClick} // Gọi handleClick khi click
                disabled={disabled} // Nếu disabled = true, button sẽ bị vô hiệu hóa
                {...buttonProps} // Nhận các props bổ sung từ Ant Design
            >
                {label}
            </Button>
        </Form.Item>
    );
};
