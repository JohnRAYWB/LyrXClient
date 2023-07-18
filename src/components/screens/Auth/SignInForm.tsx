import React, {useEffect, useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {setCookie} from "nookies";
import Link from "next/link";
import styles from "./AuthForm.module.css"
import {signInDto} from "@/api/dto/auth.dto";
import * as Api from "@/api"
import {useRouter} from "next/navigation";

export const SignInForm: React.FC = () => {

    const router = useRouter()

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values: signInDto) => {

        try {
            const data = await Api.auth.signIn(values)
            notification.success({
                message: 'Login success!',
                description: 'Route to hub...',
                duration: 2
            })

            setCookie(null, 'access_token', data.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })

            router.push('/pth/hub')

        } catch (e) {
            console.warn('Err', e)

            notification.error({
                message: 'Denied',
                description: 'Invalid email or password',
                duration: 2
            })
        }
    };
    return (
        <div className={styles.form}>
            <Form form={form} name="vertical_login" layout="vertical" onFinish={onFinish}>
                <Form.Item
                    className={styles.holders}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        className={styles.holdersInput}
                        bordered={false}
                        prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                            Login
                        </Button>
                    )}
                </Form.Item>
                <Link className={styles.formLink} href={'/'}>Forgot your password?</Link>
            </Form>
        </div>
    );
};

export default SignInForm;