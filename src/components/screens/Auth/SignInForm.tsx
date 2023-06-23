import styles from "./AuthForm.module.css"
import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Link from "next/link";

export const SignInForm: React.FC = () => {

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: any) => {
        console.log('Finish:', values);
    };

    return (
        <div className={styles.form}>
            <Form form={form} name="vertical_login" layout="vertical" onFinish={onFinish}>
                <Form.Item
                    className={styles.holders}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input bordered={false} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    className={styles.holders}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        bordered={false}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            className={styles.button}
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Log in
                        </Button>
                    )}
                </Form.Item>
                <Link className={styles.formLink} href={'/'}>Forgot your password?</Link>
            </Form>
        </div>
    );
};

export default SignInForm;