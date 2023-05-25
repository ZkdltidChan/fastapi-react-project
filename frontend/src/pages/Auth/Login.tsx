import decodeJwt from 'jwt-decode';
import { Form as AntdForm, Input, Button, Checkbox, Layout, Row, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAxios
    from '../../hooks/useAxios';
import { LOGIN_URL, LoginResponseRrops } from '../../api/config';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../hooks/auth';

type Props = {}

const Login = (props: Props) => {
    const { user, login, isLoading } = useContext(UserContext);

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        login(values.username, values.password)
        console.log(user)
    };

    useEffect(() => {
        console.log(user)
        if(user?.username) {
            navigate('/home')
        }
    }, [user])

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
                            <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
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