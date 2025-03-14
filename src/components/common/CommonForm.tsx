import { Form } from "antd";
import { BaseFormProps } from "./CommonFormInterface";

export const BaseForm = <T extends object>({
                                               children,
                                               onFinish,
                                               onFinishFailed,
                                               initialValues = {},
                                               formLayout = 'vertical',
                                               formProps,
                                               form: externalForm,
                                           }: BaseFormProps<T>) => {
    const [internalForm] = Form.useForm();
    const form = externalForm || internalForm;

    return (
        <Form
            form={form}
            layout={formLayout}
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...formProps}
            className="w-full"
        >
            {children}
        </Form>
    );
};
