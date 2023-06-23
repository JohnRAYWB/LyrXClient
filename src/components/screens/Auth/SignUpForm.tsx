import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import styles from "@/components/screens/Auth/AuthForm.module.css";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";

const SignUpForm = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: any) => {
        console.log('Finish:', values);
    };

    const router = useRouter()

    return (
            <Form form={form} name="vertical_login" layout="vertical" onFinish={onFinish}>
                <Form.Item
                    className={styles.holders}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!'}]}
                >
                    <Input bordered={false} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    className={styles.holders}
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input bordered={false} placeholder="Username" />
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
                            onClick={() => router.push('hub')}
                        >
                            Log in
                        </Button>
                    )}
                </Form.Item>
            </Form>
    );
};

export default SignUpForm;