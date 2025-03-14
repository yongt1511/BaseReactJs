import {ReactNode} from "react";
import {FormInstance, FormProps} from "antd";

export interface BaseFormProps<T = any> {
    children: ReactNode
    onFinish: (values: T) => void
    onFinishFailed?: (errorInfo: any) => void
    initialValues?: Partial<T>
    formProps?: FormProps
    submitText?: string
    resetText?: string
    showReset?: boolean
    loading?: boolean
    form?: FormInstance
}
