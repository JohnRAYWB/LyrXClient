import React, {useEffect, useState} from 'react';
import {Button, Form, Input, notification} from "antd";
import styles from "@/components/screens/Auth/AuthForm.module.css";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import * as Api from "@/api";
import {setCookie} from "nookies";
import {signUpDto} from "@/api/dto/auth.dto";

const SignUpForm = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values: signUpDto) => {

        try {
            const {access_token} = await Api.auth.signUp(values)
            notification.success({
                message: 'Login success!',
                description: 'Route to hub...',
                duration: 2
            })

            setCookie(null, '_token', access_token, {
                path: '/'
            })

            location.href = '/pth/hub'
        } catch (e) {
            console.warn('Err', e)

            notification.error({
                message: 'Denied',
                description: 'Invalid email or password',
                duration: 2
            })
        }
    };

    const router = useRouter()

    return (
            <Form form={form} name="vertical_login" layout="vertical" onFinish={onFinish}>
                <Form.Item
                    className={styles.holders}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!'}]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon"/>}
                        className={styles.holdersInput}
                        bordered={false}
                        placeholder="Email" />
                </Form.Item>
                <Form.Item
                    className={styles.holders}
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        className={styles.holdersInput}
                        bordered={false}
                        placeholder="Username" />
                </Form.Item>
                <Form.Item
                    className={styles.holders}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        className={styles.holdersInput}
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
                            Registration
                        </Button>
                    )}
                </Form.Item>
            </Form>
    );
};

export default SignUpForm;