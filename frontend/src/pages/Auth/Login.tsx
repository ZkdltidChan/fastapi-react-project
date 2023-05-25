import decodeJwt from 'jwt-decode';
import { Form as AntdForm, Input, Button, Checkbox, Layout, Row, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAxios
    from '../../hooks/useAxios';
import { LOGIN_URL, LoginResponseRrops } from '../../api/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type Props = {}

const Login = (props: Props) => {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    const navigate = useNavigate()
    const { fetchData, response, isLoading: topIsLoading } = useAxios<LoginResponseRrops>()
    const { auth, setAuthLocalStorage } = useAuth()
    const onFinish = (values: any) => {
        fetchData('POST', LOGIN_URL, values, headers)
        console.log('Received values of form: ', values);
    };
    useEffect(() => {
        if (response?.access_token) {
            const decodedToken: any = decodeJwt(response.access_token);
            setAuthLocalStorage(
                response.access_token,
                response.username,
                decodedToken.permissions,
            )
            navigate('/home')
        }

    }, [response])

    return (
        <Layout>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Card>
                    <AntdForm
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                    >
                        <AntdForm.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </AntdForm.Item>
                        <AntdForm.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </AntdForm.Item>
                        <AntdForm.Item>
                            <AntdForm.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </AntdForm.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </AntdForm.Item>

                        <AntdForm.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </AntdForm.Item>
                    </AntdForm>
                </Card>
            </Row>
        </Layout>
    )
}

export default Login