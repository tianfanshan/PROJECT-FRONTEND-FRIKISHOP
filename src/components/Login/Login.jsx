import './Login.scss'
import { useContext,useEffect } from 'react'
import { UserContext } from '../../context/UserContext/UserState'
import { Form, Input, Button,notification} from 'antd'
import { useNavigate} from 'react-router-dom'
import {  UserOutlined,LockOutlined } from '@ant-design/icons';


const Login = () => {

    const { login } = useContext(UserContext)

    const navigate = useNavigate()

    const onFinish = (values) =>{
        console.log(values)
        login(values)
        return notification.success({
          message: "Holiiii",
          description: "Bienvenido!",
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:',errorInfo)
    }

    useEffect(()=>{
         setTimeout(()=>{
            const foundToken = JSON.parse(localStorage.getItem('token'))
            if(foundToken){
                navigate('/profile')
            }
         },100)
    },[login])

  return (
    <div className="center">
    <div className="container">
          <Form
            name="basic"
            labelCol={{ span: 9}}
            wrapperCol={{ span: 20}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Pon tu email" }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
            </Form.Item>
    
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Pon tu contraseña!" }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>
    
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                    Enviar
              </Button>
            </Form.Item>
          </Form>
        </div>
        </div>
  )
}

export default Login