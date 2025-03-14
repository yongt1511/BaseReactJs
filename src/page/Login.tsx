import { useState } from 'react'
import {Form} from "antd";
import {CommonInput} from "../components/common/CommonInput";
import {BaseForm} from "../components/common/CommonForm";
import {CommonButton} from "../components/common/CommonButton";

interface UserFormValues {
    name: string
    email: string
    role: string
    birthdate: Date
    bio: string
    newsletter: boolean
    gender: string
    active: boolean
    avatar: any[]
}

function Login (){
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const initialValues: Partial<UserFormValues> = {
        role: "user",
        newsletter: true,
        active: true,
    }
    const handleFormSubmit = (values: UserFormValues) => {
        setLoading(true)
        console.log("Form values:", values)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            alert("Form submitted successfully! Check console for values.")
        }, 1000)
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <BaseForm<UserFormValues>
                    form={form}
                    onFinish={handleFormSubmit}
                    initialValues={initialValues}
                    submitText="Register"
                    loading={loading}
                    onFinishFailed={(errorInfo) => {
                        console.log("Failed:", errorInfo)
                    }}
                >
                    <CommonInput name="name" label="Name" required placeholder="Enter your name" />
                    <CommonInput type="password" name="password" label="Password" required />
                    <CommonButton name="submitBtn" label="Submit" buttonType="primary" onClick={() => form.submit()} />
                </BaseForm>
            </div>
        </>
    )
}
export default Login
