import { Form } from "../../components/Admin/Form/Form"
import { SIGNUP_URL } from "../../api/config"
type Props = {}

const SignupPage = (props: Props) => {
    const headers = {
        'content-type': 'application/x-www-form-urlencoded' 
    }
    return (
        <Form
            hasUpdate={true}
            submitButtonTitle="Signup"
            headers={headers}
            title="Signup"
            rules={[]}
            formData={[
                { username: { required: true, message: 'Please insert', trigger: 'onSubmit' }, },
                { password: { required: true, message: 'Please insert', trigger: 'onSubmit' }, },
            ]}
            formType={[
                {
                    label: 'Username',
                    key: 'username',
                    type: 'text',
                    placeholder: 'Enter your username',
                },
                {
                    label: 'Password',
                    key: 'password',
                    type: 'text',
                    placeholder: 'Enter your password',
                },
            ]}
            api={SIGNUP_URL}
            callbackUrl="/home"
            />

    )
}

export default SignupPage